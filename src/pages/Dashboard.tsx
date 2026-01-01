import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { Calculator, Variable, Shapes, ArrowRight, Flame, Target, Trophy } from 'lucide-react';

function getLevelEmoji(level: string) {
  switch (level) {
    case 'struggling': return '😟';
    case 'learning': return '😐';
    case 'confident': return '😊';
    default: return '😐';
  }
}

function getLevelColor(level: string) {
  switch (level) {
    case 'struggling': return 'text-destructive';
    case 'learning': return 'text-warning';
    case 'confident': return 'text-success';
    default: return 'text-muted-foreground';
  }
}

const areas = [
  {
    id: 'arithmetic',
    name: 'Räkna med tal',
    icon: Calculator,
    emoji: '➕',
    description: 'Addition, subtraktion, multiplikation och division',
    gradient: 'gradient-primary',
    shadow: 'shadow-glow-primary',
  },
  {
    id: 'equations',
    name: 'Ekvationer',
    icon: Variable,
    emoji: '❌',
    description: 'Lös ut x-värdet',
    gradient: 'gradient-secondary',
    shadow: 'shadow-glow-secondary',
  },
  {
    id: 'geometry',
    name: 'Geometri',
    icon: Shapes,
    emoji: '🔺',
    description: 'Former, area och omkrets',
    gradient: 'gradient-success',
    shadow: 'shadow-glow-success',
  },
];

export default function Dashboard() {
  const { progress } = useProgress();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">
              <span className="text-primary">Matte</span>Coach
            </h1>
            <Button variant="ghost" size="sm" onClick={() => navigate('/results')}>
              Mina resultat
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Level Card */}
        <Card className="overflow-hidden fade-in">
          <div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-6xl emoji-bounce">
                {getLevelEmoji(progress.level)}
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Din nivå just nu</p>
                <p className={`text-3xl font-bold ${getLevelColor(progress.level)}`}>
                  {progress.levelPercent}%
                </p>
              </div>
            </div>
            
            <div className="flex-1">
              <Progress 
                value={progress.levelPercent} 
                className="h-4"
                indicatorClassName={
                  progress.level === 'struggling' ? 'bg-destructive' :
                  progress.level === 'learning' ? 'bg-warning' : 'bg-success'
                }
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>😟 Kämpar</span>
                <span>😐 Lär sig</span>
                <span>😊 Säker</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 slide-up" style={{ animationDelay: '0.1s' }}>
          <Card className="p-4 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default">
            <Target className="w-8 h-8 mx-auto mb-2 text-primary transition-transform hover:scale-110" />
            <p className="text-2xl font-bold text-foreground">
              {progress.lastQuizScore ? `${progress.lastQuizScore.correct}/${progress.lastQuizScore.total}` : '–'}
            </p>
            <p className="text-xs text-muted-foreground">Senaste quiz</p>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-secondary transition-transform hover:scale-110" />
            <p className="text-2xl font-bold text-foreground">{progress.totalQuestions}</p>
            <p className="text-xs text-muted-foreground">Totalt tränat</p>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default">
            <Flame className="w-8 h-8 mx-auto mb-2 text-destructive transition-transform hover:scale-110" />
            <p className="text-2xl font-bold text-foreground">{progress.streakDays}</p>
            <p className="text-xs text-muted-foreground">Dagars streak</p>
          </Card>
        </div>

        {/* Area Selection */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Välj område</h2>
          
          <div className="grid gap-4 md:grid-cols-3">
            {areas.map((area, index) => (
              <button
                key={area.id}
                onClick={() => navigate(`/area/${area.id}`)}
                className="slide-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <Card className="p-6 h-full hover:shadow-lg hover:-translate-y-1.5 transition-all duration-200 cursor-pointer group border-2 border-transparent hover:border-primary/20">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl ${area.gradient} ${area.shadow} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <span className="text-3xl">{area.emoji}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{area.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{area.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </section>

        {/* Continue Button */}
        {progress.quizHistory.length > 0 && (
          <section className="slide-up" style={{ animationDelay: '0.5s' }}>
            <Card className="p-6 border-primary/20 bg-primary/5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-foreground">Fortsätt där du slutade</h3>
                  <p className="text-sm text-muted-foreground">
                    Senast: {areas.find(a => a.id === progress.quizHistory[progress.quizHistory.length - 1]?.area)?.name || 'Quiz'}
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    const last = progress.quizHistory[progress.quizHistory.length - 1];
                    if (last) {
                      navigate(`/quiz/${last.area}/${last.grade}/${last.packet}`);
                    }
                  }}
                >
                  Fortsätt
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
}

