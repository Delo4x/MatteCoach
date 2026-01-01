import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Play, CheckCircle, Circle } from 'lucide-react';
import { MathArea, Grade } from '@/types/math';

const areaInfo: Record<MathArea, { name: string; emoji: string }> = {
  arithmetic: { name: 'Räkna med tal', emoji: '➕' },
  equations: { name: 'Ekvationer', emoji: '❌' },
  geometry: { name: 'Geometri', emoji: '🔺' },
};

const packets = [
  { id: 1, name: 'Paket 1', description: '10 frågor för att komma igång' },
  { id: 2, name: 'Paket 2', description: '10 frågor för att bygga vidare' },
  { id: 3, name: 'Paket 3', description: '10 utmanande frågor' },
];

export default function PacketSelection() {
  const { areaId, gradeId } = useParams<{ areaId: string; gradeId: string }>();
  const navigate = useNavigate();
  const { progress } = useProgress();

  const area = areaId as MathArea;
  const grade = parseInt(gradeId || '1') as Grade;
  const info = areaInfo[area];

  if (!info) {
    navigate('/');
    return null;
  }

  const completedPackets = progress.areaProgress[area]?.gradeProgress[grade]?.packetsCompleted || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon-sm" onClick={() => navigate(`/area/${area}`)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <p className="text-sm text-muted-foreground">{info.name}</p>
              <h1 className="text-xl font-bold text-foreground">Grad {grade} - Quizpaket</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-4">
        {packets.map((packet, index) => {
          const isCompleted = completedPackets.includes(packet.id);

          return (
            <Card 
              key={packet.id}
              className="slide-up hover:shadow-md hover:-translate-y-1 transition-all duration-200 border-2 border-transparent hover:border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isCompleted ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="text-xl font-bold">{packet.id}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{packet.name}</h3>
                    <p className="text-sm text-muted-foreground">{packet.description}</p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate(`/quiz/${area}/${grade}/${packet.id}`)}
                  variant={isCompleted ? 'outline' : 'default'}
                >
                  <Play className="w-4 h-4" />
                  {isCompleted ? 'Gör om' : 'Starta'}
                </Button>
              </div>
            </Card>
          );
        })}
      </main>
    </div>
  );
}

