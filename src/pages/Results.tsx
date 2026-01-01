import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Target, TrendingUp, Trash2 } from 'lucide-react';
import { MathArea } from '@/types/math';

const areaInfo: Record<MathArea, { name: string; emoji: string }> = {
  arithmetic: { name: 'Räkna med tal', emoji: '➕' },
  equations: { name: 'Ekvationer', emoji: '❌' },
  geometry: { name: 'Geometri', emoji: '🔺' },
};

export default function Results() {
  const navigate = useNavigate();
  const { progress, resetProgress } = useProgress();

  const sortedHistory = [...progress.quizHistory].reverse();

  const handleReset = () => {
    if (confirm('Är du säker på att du vill nollställa all din progress? Detta kan inte ångras.')) {
      resetProgress();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon-sm" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-foreground">Mina resultat</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
              Nollställ
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center fade-in hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default">
            <Target className="w-6 h-6 mx-auto mb-2 text-primary transition-transform hover:scale-110" />
            <p className="text-2xl font-bold text-foreground">{progress.totalQuestions}</p>
            <p className="text-xs text-muted-foreground">Totalt frågor</p>
          </Card>
          
          <Card className="p-4 text-center fade-in hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default" style={{ animationDelay: '0.1s' }}>
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-success transition-transform hover:scale-110" />
            <p className="text-2xl font-bold text-foreground">{progress.levelPercent}%</p>
            <p className="text-xs text-muted-foreground">Nuvarande nivå</p>
          </Card>
          
          <Card className="p-4 text-center fade-in hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default" style={{ animationDelay: '0.2s' }}>
            <Calendar className="w-6 h-6 mx-auto mb-2 text-secondary transition-transform hover:scale-110" />
            <p className="text-2xl font-bold text-foreground">{progress.quizHistory.length}</p>
            <p className="text-xs text-muted-foreground">Quiz gjorda</p>
          </Card>
          
          <Card className="p-4 text-center fade-in hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default" style={{ animationDelay: '0.3s' }}>
            <div className="text-2xl mb-1 transition-transform hover:scale-110 inline-block">🔥</div>
            <p className="text-2xl font-bold text-foreground">{progress.streakDays}</p>
            <p className="text-xs text-muted-foreground">Dagars streak</p>
          </Card>
        </div>

        {/* Quiz History */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Historik</h2>
          
          {sortedHistory.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Du har inte gjort några quiz ännu.</p>
              <Button className="mt-4" onClick={() => navigate('/')}>
                Börja träna
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {sortedHistory.map((result, index) => {
                const info = areaInfo[result.area];
                const percentage = Math.round((result.score / result.total) * 100);
                const emoji = percentage < 50 ? '😟' : percentage < 80 ? '😐' : '😊';
                const date = new Date(result.date).toLocaleDateString('sv-SE', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <Card 
                    key={result.id} 
                    className="p-4 slide-up hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default border-2 border-transparent hover:border-primary/10"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{info.emoji}</span>
                        <div>
                          <p className="font-medium text-foreground">
                            {info.name} • Grad {result.grade} • Paket {result.packet}
                          </p>
                          <p className="text-sm text-muted-foreground">{date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{emoji}</span>
                        <div className="text-right">
                          <p className="font-bold text-foreground">{result.score}/{result.total}</p>
                          <p className={`text-sm font-medium ${
                            percentage < 50 ? 'text-destructive' :
                            percentage < 80 ? 'text-warning' : 'text-success'
                          }`}>
                            {percentage}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

