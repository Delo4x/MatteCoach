import { useState, useEffect, useCallback } from 'react';
import { MathArea, Grade, QuizResult, ProgressData } from '@/types/math';

const STORAGE_KEY = 'mattecoach-progress';

const defaultProgress: ProgressData = {
  level: 'learning',
  levelPercent: 0,
  totalQuestions: 0,
  streakDays: 0,
  lastQuizScore: null,
  quizHistory: [],
  areaProgress: {
    arithmetic: { gradeProgress: { 1: { progress: 0, packetsCompleted: [] }, 2: { progress: 0, packetsCompleted: [] }, 3: { progress: 0, packetsCompleted: [] } } },
    equations: { gradeProgress: { 1: { progress: 0, packetsCompleted: [] }, 2: { progress: 0, packetsCompleted: [] }, 3: { progress: 0, packetsCompleted: [] } } },
    geometry: { gradeProgress: { 1: { progress: 0, packetsCompleted: [] }, 2: { progress: 0, packetsCompleted: [] }, 3: { progress: 0, packetsCompleted: [] } } },
  },
  wrongQuestions: {},
};

function loadProgress(): ProgressData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle new fields
      return { ...defaultProgress, ...parsed };
    }
  } catch (error) {
    console.error('Failed to load progress:', error);
  }
  return defaultProgress;
}

function saveProgress(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

function calculateLevel(recentScores: number[]): { level: 'struggling' | 'learning' | 'confident'; percent: number } {
  if (recentScores.length === 0) {
    return { level: 'learning', percent: 0 };
  }

  const avgScore = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
  const percent = Math.round(avgScore * 100);

  if (percent < 50) {
    return { level: 'struggling', percent };
  } else if (percent < 80) {
    return { level: 'learning', percent };
  } else {
    return { level: 'confident', percent };
  }
}

function calculateStreak(history: QuizResult[]): number {
  if (history.length === 0) return 0;

  const sorted = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let checkDate = new Date(today);

  for (const result of sorted) {
    const resultDate = new Date(result.date);
    resultDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((checkDate.getTime() - resultDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === streak) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (diffDays > streak) {
      break;
    }
  }

  return streak;
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(loadProgress);

  useEffect(() => {
    // Update level based on recent quiz results
    const recentResults = progress.quizHistory
      .slice(-20) // Last 20 questions/quizzes
      .map(r => r.score / r.total);

    const { level, percent } = calculateLevel(recentResults);
    const streakDays = calculateStreak(progress.quizHistory);

    setProgress(prev => ({
      ...prev,
      level,
      levelPercent: percent,
      streakDays,
    }));
  }, [progress.quizHistory.length]);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const recordQuizResult = useCallback((result: Omit<QuizResult, 'id' | 'date'>) => {
    const newResult: QuizResult = {
      ...result,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    setProgress(prev => {
      const newHistory = [...prev.quizHistory, newResult];
      const newTotalQuestions = prev.totalQuestions + result.total;

      // Update area progress
      const areaProgress = { ...prev.areaProgress };
      if (!areaProgress[result.area]) {
        areaProgress[result.area] = {
          gradeProgress: {
            1: { progress: 0, packetsCompleted: [] },
            2: { progress: 0, packetsCompleted: [] },
            3: { progress: 0, packetsCompleted: [] },
          },
        };
      }

      const gradeProgress = { ...areaProgress[result.area].gradeProgress };
      if (!gradeProgress[result.grade]) {
        gradeProgress[result.grade] = { progress: 0, packetsCompleted: [] };
      }

      const currentGradeProgress = gradeProgress[result.grade];
      const newProgress = Math.round((result.score / result.total) * 100);
      const packetsCompleted = currentGradeProgress.packetsCompleted.includes(result.packet)
        ? currentGradeProgress.packetsCompleted
        : [...currentGradeProgress.packetsCompleted, result.packet];

      gradeProgress[result.grade] = {
        progress: Math.max(currentGradeProgress.progress, newProgress),
        packetsCompleted,
      };

      areaProgress[result.area] = { gradeProgress };

      // Update wrong questions tracking
      const wrongQuestions = { ...prev.wrongQuestions };
      result.wrongQuestionIds.forEach(id => {
        wrongQuestions[id] = (wrongQuestions[id] || 0) + 1;
      });

      // Update recent scores for level calculation
      const recentResults = newHistory
        .slice(-20)
        .map(r => r.score / r.total);
      const { level, percent } = calculateLevel(recentResults);
      const streakDays = calculateStreak(newHistory);

      return {
        ...prev,
        quizHistory: newHistory,
        totalQuestions: newTotalQuestions,
        areaProgress,
        wrongQuestions,
        lastQuizScore: { correct: result.score, total: result.total },
        level,
        levelPercent: percent,
        streakDays,
      };
    });
  }, []);

  const getGradeProgress = useCallback((area: MathArea, grade: Grade): number => {
    return progress.areaProgress[area]?.gradeProgress[grade]?.progress || 0;
  }, [progress]);

  const getRecommendedGrade = useCallback((area: MathArea): Grade => {
    const areaProg = progress.areaProgress[area];
    if (!areaProg) return 1;

    // Find the highest grade with progress > 80%
    for (let grade = 3; grade >= 1; grade--) {
      const prog = areaProg.gradeProgress[grade as Grade];
      if (prog && prog.progress >= 80) {
        return (grade + 1) as Grade;
      }
    }

    // Otherwise recommend based on overall level
    if (progress.levelPercent >= 80) return 2;
    if (progress.levelPercent >= 50) return 1;
    return 1;
  }, [progress]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    saveProgress(defaultProgress);
  }, []);

  return {
    progress,
    recordQuizResult,
    getGradeProgress,
    getRecommendedGrade,
    resetProgress,
  };
}

