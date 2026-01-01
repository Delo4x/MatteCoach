import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check, X, Eye, SkipForward, ArrowRight } from 'lucide-react';
import { MathArea, Grade, Question, QuizAnswer } from '@/types/math';
import { generateQuiz, checkAnswer } from '@/lib/questions';

const areaInfo: Record<MathArea, { name: string; emoji: string }> = {
  arithmetic: { name: 'Räkna med tal', emoji: '➕' },
  equations: { name: 'Ekvationer', emoji: '❌' },
  geometry: { name: 'Geometri', emoji: '🔺' },
};

export default function Quiz() {
  const { areaId, gradeId, packetId } = useParams<{ areaId: string; gradeId: string; packetId: string }>();
  const navigate = useNavigate();
  const { recordQuizResult } = useProgress();

  const area = areaId as MathArea;
  const grade = parseInt(gradeId || '1') as Grade;
  const packet = parseInt(packetId || '1');
  const info = areaInfo[area];

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (area && grade && packet) {
      setQuestions(generateQuiz(area, grade, packet));
    }
  }, [area, grade, packet]);

  if (!info || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Laddar quiz...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progressPercent = ((currentIndex) / questions.length) * 100;

  const handleCheck = () => {
    if (!userAnswer.trim()) return;
    
    const isCorrect = checkAnswer(userAnswer, currentQuestion.correctAnswer);
    setShowResult(isCorrect ? 'correct' : 'incorrect');
    
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      userAnswer,
      isCorrect,
      showedSolution: false,
    }]);
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    // Update last answer to mark solution as shown
    setAnswers(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1].showedSolution = true;
      }
      return updated;
    });
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      // Quiz complete
      const correctCount = answers.filter(a => a.isCorrect).length;
      const wrongIds = answers.filter(a => !a.isCorrect).map(a => a.questionId);
      
      recordQuizResult({
        area,
        grade,
        packet,
        score: correctCount,
        total: questions.length,
        wrongQuestionIds: wrongIds,
      });
      
      setIsComplete(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setShowResult(null);
      setShowSolution(false);
    }
  };

  const handleSkip = () => {
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      userAnswer: '',
      isCorrect: false,
      showedSolution: false,
    }]);
    handleNext();
  };

  if (isComplete) {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((correctCount / questions.length) * 100);
    const emoji = percentage < 50 ? '😟' : percentage < 80 ? '😐' : '😊';

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="container py-4">
            <h1 className="text-xl font-bold text-foreground">Quiz klart!</h1>
          </div>
        </header>

        <main className="container py-8 space-y-6">
          <Card className="p-8 text-center fade-in">
            <div className="text-8xl mb-4 emoji-bounce">{emoji}</div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {correctCount} av {questions.length}
            </h2>
            <p className="text-muted-foreground mb-6">
              {percentage >= 80 ? 'Fantastiskt jobbat! 🎉' : 
               percentage >= 50 ? 'Bra jobbat! Fortsätt träna.' : 
               'Kämpa på! Övning ger färdighet.'}
            </p>

            <Progress 
              value={percentage} 
              className="h-4 mb-8"
              indicatorClassName={
                percentage < 50 ? 'bg-destructive' :
                percentage < 80 ? 'bg-warning' : 'bg-success'
              }
            />

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate(`/packets/${area}/${grade}`)}>
                Tillbaka till paket
              </Button>
              <Button onClick={() => {
                setQuestions(generateQuiz(area, grade, packet));
                setCurrentIndex(0);
                setAnswers([]);
                setUserAnswer('');
                setShowResult(null);
                setShowSolution(false);
                setIsComplete(false);
              }}>
                Gör om
              </Button>
              <Button variant="secondary" onClick={() => navigate('/')}>
                Till startsidan
              </Button>
            </div>
          </Card>

          {answers.some(a => !a.isCorrect) && (
            <Card className="p-6 slide-up">
              <h3 className="font-bold text-foreground mb-4">Frågor du missade:</h3>
              <div className="space-y-2">
                {answers.filter(a => !a.isCorrect).map((answer, i) => {
                  const q = questions.find(q => q.id === answer.questionId);
                  return q ? (
                    <div key={i} className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-foreground">{q.question}</p>
                      <p className="text-sm text-muted-foreground">
                        Ditt svar: {answer.userAnswer || '(hoppade över)'} • Rätt svar: {q.correctAnswer}
                      </p>
                    </div>
                  ) : null;
                })}
              </div>
            </Card>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="icon-sm" onClick={() => navigate(`/packets/${area}/${grade}`)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="font-bold text-foreground">
              Fråga {currentIndex + 1} av {questions.length}
            </span>
            <span className="text-2xl">{info.emoji}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </header>

      <main className="container py-8">
        <Card className={`p-6 mb-6 transition-all duration-300 ${
          showResult === 'correct' ? 'ring-2 ring-success pulse-success' :
          showResult === 'incorrect' ? 'ring-2 ring-destructive shake-error' : ''
        }`}>
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-2">Lös uppgiften:</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <Input
              type="text"
              placeholder="Skriv ditt svar..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !showResult && handleCheck()}
              disabled={showResult !== null}
              className="text-center text-xl"
              autoFocus
            />

            {showResult && (
              <div className={`p-4 rounded-xl text-center fade-in ${
                showResult === 'correct' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
              }`}>
                {showResult === 'correct' ? (
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-6 h-6" />
                    <span className="font-bold text-lg">Rätt! 🎉</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <X className="w-6 h-6" />
                    <span className="font-bold text-lg">Nästan! Rätt svar: {currentQuestion.correctAnswer}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Solution */}
        {showSolution && (
          <Card className="p-6 mb-6 bg-muted/50 fade-in">
            <h3 className="font-bold text-foreground mb-4">Lösning:</h3>
            <div className="space-y-3">
              {currentQuestion.solution.map((step) => (
                <div key={step.step} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <p className="text-foreground">{step.description}</p>
                    {step.result && (
                      <p className="font-mono font-bold text-primary mt-1">{step.result}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {!showResult ? (
            <>
              <Button onClick={handleCheck} disabled={!userAnswer.trim()} size="lg">
                <Check className="w-5 h-5" />
                Rätta
              </Button>
              <Button variant="outline" onClick={handleShowSolution} size="lg">
                <Eye className="w-5 h-5" />
                Visa lösning
              </Button>
              <Button variant="muted" onClick={handleSkip} size="lg">
                <SkipForward className="w-5 h-5" />
                Hoppa över
              </Button>
            </>
          ) : (
            <>
              {!showSolution && showResult === 'incorrect' && (
                <Button variant="outline" onClick={handleShowSolution} size="lg">
                  <Eye className="w-5 h-5" />
                  Visa lösning
                </Button>
              )}
              <Button onClick={handleNext} size="lg">
                {currentIndex + 1 >= questions.length ? 'Se resultat' : 'Nästa fråga'}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

