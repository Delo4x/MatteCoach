import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Star, Lock, BookOpen, Gamepad2 } from 'lucide-react';
import { MathArea, Grade } from '@/types/math';

const areaInfo: Record<MathArea, { name: string; emoji: string; gradient: string }> = {
  arithmetic: { name: 'Räkna med tal', emoji: '➕', gradient: 'gradient-primary' },
  equations: { name: 'Ekvationer', emoji: '❌', gradient: 'gradient-secondary' },
  geometry: { name: 'Geometri', emoji: '🔺', gradient: 'gradient-success' },
};

const gradeInfo: Record<Grade, { name: string; description: string; difficulty: string }> = {
  1: { name: 'Grad 1', description: 'Grundläggande', difficulty: 'Lätt' },
  2: { name: 'Grad 2', description: 'Utvecklande', difficulty: 'Medel' },
  3: { name: 'Grad 3', description: 'Utmanande', difficulty: 'Svår' },
};

export default function AreaSelection() {
  const { areaId } = useParams<{ areaId: string }>();
  const navigate = useNavigate();
  const { getGradeProgress, getRecommendedGrade } = useProgress();

  const area = areaId as MathArea;
  const info = areaInfo[area];
  const recommendedGrade = getRecommendedGrade(area);

  if (!info) {
    navigate('/');
    return null;
  }

  const grades: Grade[] = [1, 2, 3];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon-sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{info.emoji}</span>
              <h1 className="text-xl font-bold text-foreground">{info.name}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        <p className="text-muted-foreground">Välj en nivå för att börja träna</p>

        <div className="grid gap-4">
          {grades.map((grade, index) => {
            const gradeData = gradeInfo[grade];
            const progressPercent = getGradeProgress(area, grade);
            const isRecommended = grade === recommendedGrade;

            return (
              <Card 
                key={grade}
                className={`overflow-hidden slide-up transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${isRecommended ? 'ring-2 ring-primary ring-offset-2' : 'border-2 border-transparent hover:border-primary/20'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl ${info.gradient} flex items-center justify-center`}>
                        <span className="text-2xl font-bold text-primary-foreground">{grade}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg text-foreground">{gradeData.name}</h3>
                          {isRecommended && (
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                              Rekommenderad
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{gradeData.description} • {gradeData.difficulty}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= grade ? 'text-warning fill-warning' : 'text-muted'}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Din progress</span>
                      <span className="font-medium text-foreground">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate(`/learn/${area}/${grade}`)}
                    >
                      <BookOpen className="w-4 h-4" />
                      Lär dig
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => navigate(`/packets/${area}/${grade}`)}
                    >
                      <Gamepad2 className="w-4 h-4" />
                      Quiz
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}

