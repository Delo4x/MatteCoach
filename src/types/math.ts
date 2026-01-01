export type MathArea = 'arithmetic' | 'equations' | 'geometry';
export type Grade = 1 | 2 | 3;

export interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  solution: SolutionStep[];
  area: MathArea;
  grade: Grade;
}

export interface SolutionStep {
  step: number;
  description: string;
  result?: string;
}

export interface QuizAnswer {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  showedSolution: boolean;
}

export interface QuizResult {
  id: string;
  area: MathArea;
  grade: Grade;
  packet: number;
  score: number;
  total: number;
  date: string;
  wrongQuestionIds: string[];
}

export interface Lesson {
  id: string;
  title: string;
  rule: string;
  examples: Example[];
  miniQuestion: Question;
}

export interface Example {
  problem: string;
  steps: string[];
  answer: string;
}

export interface AreaProgress {
  gradeProgress: Record<Grade, GradeProgress>;
}

export interface GradeProgress {
  progress: number;
  packetsCompleted: number[];
}

export interface ProgressData {
  level: 'struggling' | 'learning' | 'confident';
  levelPercent: number;
  totalQuestions: number;
  streakDays: number;
  lastQuizScore: { correct: number; total: number } | null;
  quizHistory: QuizResult[];
  areaProgress: Record<MathArea, AreaProgress>;
  wrongQuestions: Record<string, number>; // questionId -> count
}

