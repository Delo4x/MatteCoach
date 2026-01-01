import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { MathArea, Grade, Lesson } from '@/types/math';

const areaInfo: Record<MathArea, { name: string; emoji: string }> = {
  arithmetic: { name: 'Räkna med tal', emoji: '➕' },
  equations: { name: 'Ekvationer', emoji: '❌' },
  geometry: { name: 'Geometri', emoji: '🔺' },
};

// Mini lessons for each area and grade
const lessons: Record<MathArea, Record<Grade, Lesson[]>> = {
  arithmetic: {
    1: [
      {
        id: 'arith-1-1',
        title: 'Addition - lägga ihop',
        rule: 'När vi adderar (lägger ihop) tal börjar vi från vänster och räknar upp.',
        examples: [
          { problem: '5 + 3', steps: ['Börja på 5', 'Räkna upp 3 steg: 6, 7, 8'], answer: '8' },
          { problem: '12 + 7', steps: ['Börja på 12', 'Lägg till 7'], answer: '19' },
        ],
        miniQuestion: {
          id: 'arith-1-1-q',
          question: '8 + 4 = ?',
          correctAnswer: '12',
          solution: [
            { step: 1, description: 'Börja på 8' },
            { step: 2, description: 'Räkna upp 4: 9, 10, 11, 12' },
            { step: 3, description: 'Svaret är', result: '12' },
          ],
          area: 'arithmetic',
          grade: 1,
        },
      },
      {
        id: 'arith-1-2',
        title: 'Subtraktion - ta bort',
        rule: 'När vi subtraherar (tar bort) räknar vi nedåt från det första talet.',
        examples: [
          { problem: '10 - 4', steps: ['Börja på 10', 'Räkna ner 4 steg: 9, 8, 7, 6'], answer: '6' },
          { problem: '15 - 8', steps: ['Börja på 15', 'Ta bort 8'], answer: '7' },
        ],
        miniQuestion: {
          id: 'arith-1-2-q',
          question: '13 - 5 = ?',
          correctAnswer: '8',
          solution: [
            { step: 1, description: 'Börja på 13' },
            { step: 2, description: 'Räkna ner 5: 12, 11, 10, 9, 8' },
            { step: 3, description: 'Svaret är', result: '8' },
          ],
          area: 'arithmetic',
          grade: 1,
        },
      },
    ],
    2: [
      {
        id: 'arith-2-1',
        title: 'Negativa tal',
        rule: 'Negativa tal är tal mindre än noll. Plus ett negativt tal = minus. Minus ett negativt tal = plus.',
        examples: [
          { problem: '5 + (-3)', steps: ['Plus negativ = minus', '5 - 3 = 2'], answer: '2' },
          { problem: '4 - (-2)', steps: ['Minus negativ = plus', '4 + 2 = 6'], answer: '6' },
        ],
        miniQuestion: {
          id: 'arith-2-1-q',
          question: '7 + (-4) = ?',
          correctAnswer: '3',
          solution: [
            { step: 1, description: 'Plus negativ tal = minus' },
            { step: 2, description: '7 - 4 = 3' },
            { step: 3, description: 'Svaret är', result: '3' },
          ],
          area: 'arithmetic',
          grade: 2,
        },
      },
    ],
    3: [
      {
        id: 'arith-3-1',
        title: 'Multiplikation',
        rule: 'Multiplikation är upprepad addition. 3 × 4 betyder "3 grupper med 4".',
        examples: [
          { problem: '4 × 5', steps: ['4 grupper med 5', '5 + 5 + 5 + 5 = 20'], answer: '20' },
          { problem: '6 × 3', steps: ['6 grupper med 3', '18'], answer: '18' },
        ],
        miniQuestion: {
          id: 'arith-3-1-q',
          question: '7 × 4 = ?',
          correctAnswer: '28',
          solution: [
            { step: 1, description: '7 grupper med 4' },
            { step: 2, description: '7 × 4 = 28' },
          ],
          area: 'arithmetic',
          grade: 3,
        },
      },
    ],
  },
  equations: {
    1: [
      {
        id: 'eq-1-1',
        title: 'Enkla ekvationer med addition',
        rule: 'För att lösa x + a = b, flytta a till andra sidan och byt tecken.',
        examples: [
          { problem: 'x + 3 = 7', steps: ['Flytta 3 till höger', 'x = 7 - 3', 'x = 4'], answer: 'x = 4' },
          { problem: 'x + 5 = 12', steps: ['x = 12 - 5', 'x = 7'], answer: 'x = 7' },
        ],
        miniQuestion: {
          id: 'eq-1-1-q',
          question: 'x + 6 = 10, vad är x?',
          correctAnswer: '4',
          solution: [
            { step: 1, description: 'Flytta 6 till andra sidan' },
            { step: 2, description: 'x = 10 - 6' },
            { step: 3, description: 'x =', result: '4' },
          ],
          area: 'equations',
          grade: 1,
        },
      },
    ],
    2: [
      {
        id: 'eq-2-1',
        title: 'Ekvationer med koefficient',
        rule: 'För ax + b = c: först flytta b, sedan dela med a.',
        examples: [
          { problem: '2x + 4 = 10', steps: ['2x = 10 - 4 = 6', 'x = 6 ÷ 2 = 3'], answer: 'x = 3' },
        ],
        miniQuestion: {
          id: 'eq-2-1-q',
          question: '3x + 2 = 11, vad är x?',
          correctAnswer: '3',
          solution: [
            { step: 1, description: '3x = 11 - 2 = 9' },
            { step: 2, description: 'x = 9 ÷ 3' },
            { step: 3, description: 'x =', result: '3' },
          ],
          area: 'equations',
          grade: 2,
        },
      },
    ],
    3: [
      {
        id: 'eq-3-1',
        title: 'X på båda sidor',
        rule: 'Samla alla x-termer på ena sidan och alla konstanter på den andra.',
        examples: [
          { problem: '3x + 2 = x + 8', steps: ['3x - x = 8 - 2', '2x = 6', 'x = 3'], answer: 'x = 3' },
        ],
        miniQuestion: {
          id: 'eq-3-1-q',
          question: '4x + 1 = 2x + 7, vad är x?',
          correctAnswer: '3',
          solution: [
            { step: 1, description: '4x - 2x = 7 - 1' },
            { step: 2, description: '2x = 6' },
            { step: 3, description: 'x =', result: '3' },
          ],
          area: 'equations',
          grade: 3,
        },
      },
    ],
  },
  geometry: {
    1: [
      {
        id: 'geo-1-1',
        title: 'Omkrets av rektangel',
        rule: 'Omkrets = summan av alla sidor. För rektangel: O = 2 × (längd + bredd)',
        examples: [
          { problem: 'Rektangel: 5 cm × 3 cm', steps: ['O = 2 × (5 + 3)', 'O = 2 × 8 = 16'], answer: '16 cm' },
        ],
        miniQuestion: {
          id: 'geo-1-1-q',
          question: 'Rektangel med sidorna 4 cm och 6 cm. Omkrets?',
          correctAnswer: '20',
          solution: [
            { step: 1, description: 'O = 2 × (4 + 6)' },
            { step: 2, description: 'O = 2 × 10' },
            { step: 3, description: 'Omkrets =', result: '20 cm' },
          ],
          area: 'geometry',
          grade: 1,
        },
      },
    ],
    2: [
      {
        id: 'geo-2-1',
        title: 'Area av rektangel och triangel',
        rule: 'Rektangel: A = bredd × höjd. Triangel: A = (bas × höjd) ÷ 2',
        examples: [
          { problem: 'Rektangel 4 × 6', steps: ['A = 4 × 6'], answer: '24 cm²' },
          { problem: 'Triangel bas 6, höjd 4', steps: ['A = (6 × 4) ÷ 2 = 12'], answer: '12 cm²' },
        ],
        miniQuestion: {
          id: 'geo-2-1-q',
          question: 'Triangel med bas 8 cm och höjd 6 cm. Area?',
          correctAnswer: '24',
          solution: [
            { step: 1, description: 'A = (bas × höjd) ÷ 2' },
            { step: 2, description: 'A = (8 × 6) ÷ 2 = 48 ÷ 2' },
            { step: 3, description: 'Area =', result: '24 cm²' },
          ],
          area: 'geometry',
          grade: 2,
        },
      },
    ],
    3: [
      {
        id: 'geo-3-1',
        title: 'Vinklar i triangel',
        rule: 'Summan av alla vinklar i en triangel är alltid 180°.',
        examples: [
          { problem: 'Vinklar 60° och 70°', steps: ['Tredje = 180 - 60 - 70'], answer: '50°' },
        ],
        miniQuestion: {
          id: 'geo-3-1-q',
          question: 'Triangel har vinklar 45° och 90°. Tredje vinkeln?',
          correctAnswer: '45',
          solution: [
            { step: 1, description: 'Vinkelsumma = 180°' },
            { step: 2, description: '180 - 45 - 90 = 45' },
          ],
          area: 'geometry',
          grade: 3,
        },
      },
    ],
  },
};

export default function Learn() {
  const { areaId, gradeId } = useParams<{ areaId: string; gradeId: string }>();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showMiniAnswer, setShowMiniAnswer] = useState(false);

  const area = areaId as MathArea;
  const grade = parseInt(gradeId || '1') as Grade;
  const info = areaInfo[area];

  if (!info) {
    navigate('/');
    return null;
  }

  const areaLessons = lessons[area][grade] || [];
  const lesson = areaLessons[currentLesson];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="container py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon-sm" onClick={() => navigate(`/area/${area}`)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-foreground">Lektioner</h1>
            </div>
          </div>
        </header>
        <main className="container py-8">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Inga lektioner tillgängliga just nu.</p>
            <Button className="mt-4" onClick={() => navigate(`/packets/${area}/${grade}`)}>
              Gå till quiz
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon-sm" onClick={() => navigate(`/area/${area}`)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <p className="text-sm text-muted-foreground">{info.name} • Grad {grade}</p>
                <h1 className="text-lg font-bold text-foreground">Lektion {currentLesson + 1} av {areaLessons.length}</h1>
              </div>
            </div>
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        {/* Lesson Title */}
        <Card className="p-6 fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-4">{lesson.title}</h2>
          <div className="p-4 bg-primary/5 rounded-xl border-l-4 border-primary">
            <p className="text-foreground font-medium">{lesson.rule}</p>
          </div>
        </Card>

        {/* Examples */}
        <Card className="p-6 slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="font-bold text-foreground mb-4">Exempel:</h3>
          <div className="space-y-4">
            {lesson.examples.map((example, i) => (
              <div key={i} className="p-4 bg-muted/50 rounded-xl">
                <p className="font-mono font-bold text-lg text-foreground mb-2">{example.problem}</p>
                <div className="space-y-1">
                  {example.steps.map((step, j) => (
                    <p key={j} className="text-sm text-muted-foreground">→ {step}</p>
                  ))}
                </div>
                <p className="mt-2 font-bold text-success">Svar: {example.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Mini Question */}
        <Card className="p-6 slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-bold text-foreground mb-4">Prova själv:</h3>
          <div className="p-4 bg-secondary/10 rounded-xl">
            <p className="text-lg font-bold text-foreground mb-4">{lesson.miniQuestion.question}</p>
            
            {!showMiniAnswer ? (
              <Button onClick={() => setShowMiniAnswer(true)}>
                Visa lösning
              </Button>
            ) : (
              <div className="space-y-3 fade-in">
                {lesson.miniQuestion.solution.map((step) => (
                  <div key={step.step} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <span className="text-foreground">{step.description}</span>
                      {step.result && <span className="font-bold text-primary ml-2">{step.result}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex gap-3 justify-center">
          {currentLesson > 0 && (
            <Button 
              variant="outline" 
              onClick={() => {
                setCurrentLesson(prev => prev - 1);
                setShowMiniAnswer(false);
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Föregående
            </Button>
          )}
          
          {currentLesson < areaLessons.length - 1 ? (
            <Button 
              onClick={() => {
                setCurrentLesson(prev => prev + 1);
                setShowMiniAnswer(false);
              }}
            >
              Nästa lektion
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              variant="success"
              onClick={() => navigate(`/packets/${area}/${grade}`)}
            >
              <CheckCircle className="w-4 h-4" />
              Börja quiz
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

