import { MathArea, Grade, Question } from '@/types/math';

// Question pools for each area and grade
const questionPools: Record<MathArea, Record<Grade, () => Question[]>> = {
  arithmetic: {
    1: () => [
      {
        id: 'arith-1-1',
        question: '5 + 3 = ?',
        correctAnswer: '8',
        solution: [
          { step: 1, description: 'Börja på 5' },
          { step: 2, description: 'Räkna upp 3 steg: 6, 7, 8' },
          { step: 3, description: 'Svaret är', result: '8' },
        ],
        area: 'arithmetic',
        grade: 1,
      },
      {
        id: 'arith-1-2',
        question: '12 + 7 = ?',
        correctAnswer: '19',
        solution: [
          { step: 1, description: 'Börja på 12' },
          { step: 2, description: 'Lägg till 7' },
          { step: 3, description: 'Svaret är', result: '19' },
        ],
        area: 'arithmetic',
        grade: 1,
      },
      {
        id: 'arith-1-3',
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
      {
        id: 'arith-1-4',
        question: '10 - 4 = ?',
        correctAnswer: '6',
        solution: [
          { step: 1, description: 'Börja på 10' },
          { step: 2, description: 'Räkna ner 4 steg: 9, 8, 7, 6' },
          { step: 3, description: 'Svaret är', result: '6' },
        ],
        area: 'arithmetic',
        grade: 1,
      },
      {
        id: 'arith-1-5',
        question: '15 - 8 = ?',
        correctAnswer: '7',
        solution: [
          { step: 1, description: 'Börja på 15' },
          { step: 2, description: 'Ta bort 8' },
          { step: 3, description: 'Svaret är', result: '7' },
        ],
        area: 'arithmetic',
        grade: 1,
      },
      {
        id: 'arith-1-6',
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
      {
        id: 'arith-1-7',
        question: '9 + 6 = ?',
        correctAnswer: '15',
        solution: [
          { step: 1, description: 'Börja på 9' },
          { step: 2, description: 'Räkna upp 6: 10, 11, 12, 13, 14, 15' },
          { step: 3, description: 'Svaret är', result: '15' },
        ],
        area: 'arithmetic',
        grade: 1,
      },
      {
        id: 'arith-1-8',
        question: '20 - 6 = ?',
        correctAnswer: '14',
        solution: [
          { step: 1, description: 'Börja på 20' },
          { step: 2, description: 'Räkna ner 6: 19, 18, 17, 16, 15, 14' },
          { step: 3, description: 'Svaret är', result: '14' },
        ],
        area: 'arithmetic',
        grade: 1,
      },
    ],
    2: () => [
      {
        id: 'arith-2-1',
        question: '-2 + 6 = ?',
        correctAnswer: '4',
        solution: [
          { step: 1, description: 'Plus negativ tal = minus' },
          { step: 2, description: '-2 + 6 = 6 - 2' },
          { step: 3, description: 'Svaret är', result: '4' },
        ],
        area: 'arithmetic',
        grade: 2,
      },
      {
        id: 'arith-2-2',
        question: '7 - 12 = ?',
        correctAnswer: '-5',
        solution: [
          { step: 1, description: '7 - 12 = -(12 - 7)' },
          { step: 2, description: '12 - 7 = 5' },
          { step: 3, description: 'Svaret är', result: '-5' },
        ],
        area: 'arithmetic',
        grade: 2,
      },
      {
        id: 'arith-2-3',
        question: '5 + (-3) = ?',
        correctAnswer: '2',
        solution: [
          { step: 1, description: 'Plus negativ = minus' },
          { step: 2, description: '5 - 3 = 2' },
          { step: 3, description: 'Svaret är', result: '2' },
        ],
        area: 'arithmetic',
        grade: 2,
      },
      {
        id: 'arith-2-4',
        question: '4 - (-2) = ?',
        correctAnswer: '6',
        solution: [
          { step: 1, description: 'Minus negativ = plus' },
          { step: 2, description: '4 + 2 = 6' },
          { step: 3, description: 'Svaret är', result: '6' },
        ],
        area: 'arithmetic',
        grade: 2,
      },
      {
        id: 'arith-2-5',
        question: '-8 + 5 = ?',
        correctAnswer: '-3',
        solution: [
          { step: 1, description: '-8 + 5 = -(8 - 5)' },
          { step: 2, description: '8 - 5 = 3' },
          { step: 3, description: 'Svaret är', result: '-3' },
        ],
        area: 'arithmetic',
        grade: 2,
      },
      {
        id: 'arith-2-6',
        question: '10 - (-4) = ?',
        correctAnswer: '14',
        solution: [
          { step: 1, description: 'Minus negativ = plus' },
          { step: 2, description: '10 + 4 = 14' },
          { step: 3, description: 'Svaret är', result: '14' },
        ],
        area: 'arithmetic',
        grade: 2,
      },
    ],
    3: () => [
      {
        id: 'arith-3-1',
        question: '4 × 3 = ?',
        correctAnswer: '12',
        solution: [
          { step: 1, description: '4 grupper med 3' },
          { step: 2, description: '4 × 3 = 12' },
          { step: 3, description: 'Svaret är', result: '12' },
        ],
        area: 'arithmetic',
        grade: 3,
      },
      {
        id: 'arith-3-2',
        question: '18 ÷ 3 = ?',
        correctAnswer: '6',
        solution: [
          { step: 1, description: 'Hur många gånger går 3 i 18?' },
          { step: 2, description: '3 × 6 = 18' },
          { step: 3, description: 'Svaret är', result: '6' },
        ],
        area: 'arithmetic',
        grade: 3,
      },
      {
        id: 'arith-3-3',
        question: '7 × 4 = ?',
        correctAnswer: '28',
        solution: [
          { step: 1, description: '7 grupper med 4' },
          { step: 2, description: '7 × 4 = 28' },
          { step: 3, description: 'Svaret är', result: '28' },
        ],
        area: 'arithmetic',
        grade: 3,
      },
      {
        id: 'arith-3-4',
        question: '24 ÷ 6 = ?',
        correctAnswer: '4',
        solution: [
          { step: 1, description: 'Hur många gånger går 6 i 24?' },
          { step: 2, description: '6 × 4 = 24' },
          { step: 3, description: 'Svaret är', result: '4' },
        ],
        area: 'arithmetic',
        grade: 3,
      },
      {
        id: 'arith-3-5',
        question: '5 × 6 = ?',
        correctAnswer: '30',
        solution: [
          { step: 1, description: '5 grupper med 6' },
          { step: 2, description: '5 × 6 = 30' },
          { step: 3, description: 'Svaret är', result: '30' },
        ],
        area: 'arithmetic',
        grade: 3,
      },
      {
        id: 'arith-3-6',
        question: '35 ÷ 5 = ?',
        correctAnswer: '7',
        solution: [
          { step: 1, description: 'Hur många gånger går 5 i 35?' },
          { step: 2, description: '5 × 7 = 35' },
          { step: 3, description: 'Svaret är', result: '7' },
        ],
        area: 'arithmetic',
        grade: 3,
      },
    ],
  },
  equations: {
    1: () => [
      {
        id: 'eq-1-1',
        question: 'x + 3 = 7, vad är x?',
        correctAnswer: '4',
        solution: [
          { step: 1, description: 'Flytta 3 till andra sidan' },
          { step: 2, description: 'x = 7 - 3' },
          { step: 3, description: 'x =', result: '4' },
        ],
        area: 'equations',
        grade: 1,
      },
      {
        id: 'eq-1-2',
        question: 'x + 5 = 12, vad är x?',
        correctAnswer: '7',
        solution: [
          { step: 1, description: 'Flytta 5 till andra sidan' },
          { step: 2, description: 'x = 12 - 5' },
          { step: 3, description: 'x =', result: '7' },
        ],
        area: 'equations',
        grade: 1,
      },
      {
        id: 'eq-1-3',
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
      {
        id: 'eq-1-4',
        question: '2x = 10, vad är x?',
        correctAnswer: '5',
        solution: [
          { step: 1, description: 'Dela båda sidor med 2' },
          { step: 2, description: 'x = 10 ÷ 2' },
          { step: 3, description: 'x =', result: '5' },
        ],
        area: 'equations',
        grade: 1,
      },
      {
        id: 'eq-1-5',
        question: '3x = 15, vad är x?',
        correctAnswer: '5',
        solution: [
          { step: 1, description: 'Dela båda sidor med 3' },
          { step: 2, description: 'x = 15 ÷ 3' },
          { step: 3, description: 'x =', result: '5' },
        ],
        area: 'equations',
        grade: 1,
      },
    ],
    2: () => [
      {
        id: 'eq-2-1',
        question: '3x + 2 = 10, vad är x?',
        correctAnswer: '3',
        solution: [
          { step: 1, description: 'Ta bort 2 från båda sidor' },
          { step: 2, description: '3x = 10 - 2 = 8' },
          { step: 3, description: 'Dela båda sidor med 3' },
          { step: 4, description: 'x =', result: '3' },
        ],
        area: 'equations',
        grade: 2,
      },
      {
        id: 'eq-2-2',
        question: '5x - 4 = 21, vad är x?',
        correctAnswer: '5',
        solution: [
          { step: 1, description: 'Lägg till 4 på båda sidor' },
          { step: 2, description: '5x = 21 + 4 = 25' },
          { step: 3, description: 'Dela båda sidor med 5' },
          { step: 4, description: 'x =', result: '5' },
        ],
        area: 'equations',
        grade: 2,
      },
      {
        id: 'eq-2-3',
        question: '2x + 4 = 10, vad är x?',
        correctAnswer: '3',
        solution: [
          { step: 1, description: 'Ta bort 4 från båda sidor' },
          { step: 2, description: '2x = 10 - 4 = 6' },
          { step: 3, description: 'Dela båda sidor med 2' },
          { step: 4, description: 'x =', result: '3' },
        ],
        area: 'equations',
        grade: 2,
      },
      {
        id: 'eq-2-4',
        question: '4x - 3 = 13, vad är x?',
        correctAnswer: '4',
        solution: [
          { step: 1, description: 'Lägg till 3 på båda sidor' },
          { step: 2, description: '4x = 13 + 3 = 16' },
          { step: 3, description: 'Dela båda sidor med 4' },
          { step: 4, description: 'x =', result: '4' },
        ],
        area: 'equations',
        grade: 2,
      },
    ],
    3: () => [
      {
        id: 'eq-3-1',
        question: '2x + 4 = 3x - 1, vad är x?',
        correctAnswer: '5',
        solution: [
          { step: 1, description: 'Samla x-termer på ena sidan' },
          { step: 2, description: '2x - 3x = -1 - 4' },
          { step: 3, description: '-x = -5' },
          { step: 4, description: 'Multiplicera med -1' },
          { step: 5, description: 'x =', result: '5' },
        ],
        area: 'equations',
        grade: 3,
      },
      {
        id: 'eq-3-2',
        question: '4x + 1 = 2x + 7, vad är x?',
        correctAnswer: '3',
        solution: [
          { step: 1, description: 'Samla x-termer på ena sidan' },
          { step: 2, description: '4x - 2x = 7 - 1' },
          { step: 3, description: '2x = 6' },
          { step: 4, description: 'Dela båda sidor med 2' },
          { step: 5, description: 'x =', result: '3' },
        ],
        area: 'equations',
        grade: 3,
      },
      {
        id: 'eq-3-3',
        question: '5x - 2 = 3x + 8, vad är x?',
        correctAnswer: '5',
        solution: [
          { step: 1, description: 'Samla x-termer på ena sidan' },
          { step: 2, description: '5x - 3x = 8 + 2' },
          { step: 3, description: '2x = 10' },
          { step: 4, description: 'Dela båda sidor med 2' },
          { step: 5, description: 'x =', result: '5' },
        ],
        area: 'equations',
        grade: 3,
      },
    ],
  },
  geometry: {
    1: () => [
      {
        id: 'geo-1-1',
        question: 'Rektangel med sidorna 4 cm och 6 cm. Omkrets?',
        correctAnswer: '20',
        solution: [
          { step: 1, description: 'O = 2 × (längd + bredd)' },
          { step: 2, description: 'O = 2 × (4 + 6) = 2 × 10' },
          { step: 3, description: 'Omkrets =', result: '20 cm' },
        ],
        area: 'geometry',
        grade: 1,
      },
      {
        id: 'geo-1-2',
        question: 'Rektangel med sidorna 5 cm och 3 cm. Omkrets?',
        correctAnswer: '16',
        solution: [
          { step: 1, description: 'O = 2 × (längd + bredd)' },
          { step: 2, description: 'O = 2 × (5 + 3) = 2 × 8' },
          { step: 3, description: 'Omkrets =', result: '16 cm' },
        ],
        area: 'geometry',
        grade: 1,
      },
      {
        id: 'geo-1-3',
        question: 'Kvadrat med sida 7 cm. Omkrets?',
        correctAnswer: '28',
        solution: [
          { step: 1, description: 'Kvadrat: alla sidor lika långa' },
          { step: 2, description: 'O = 4 × 7' },
          { step: 3, description: 'Omkrets =', result: '28 cm' },
        ],
        area: 'geometry',
        grade: 1,
      },
    ],
    2: () => [
      {
        id: 'geo-2-1',
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
      {
        id: 'geo-2-2',
        question: 'Rektangel med längd 5 cm och bredd 4 cm. Area?',
        correctAnswer: '20',
        solution: [
          { step: 1, description: 'A = längd × bredd' },
          { step: 2, description: 'A = 5 × 4' },
          { step: 3, description: 'Area =', result: '20 cm²' },
        ],
        area: 'geometry',
        grade: 2,
      },
      {
        id: 'geo-2-3',
        question: 'Triangel med bas 10 cm och höjd 5 cm. Area?',
        correctAnswer: '25',
        solution: [
          { step: 1, description: 'A = (bas × höjd) ÷ 2' },
          { step: 2, description: 'A = (10 × 5) ÷ 2 = 50 ÷ 2' },
          { step: 3, description: 'Area =', result: '25 cm²' },
        ],
        area: 'geometry',
        grade: 2,
      },
    ],
    3: () => [
      {
        id: 'geo-3-1',
        question: 'Triangel har vinklar 45° och 90°. Tredje vinkeln?',
        correctAnswer: '45',
        solution: [
          { step: 1, description: 'Vinkelsumma = 180°' },
          { step: 2, description: '180 - 45 - 90 = 45' },
          { step: 3, description: 'Tredje vinkeln =', result: '45°' },
        ],
        area: 'geometry',
        grade: 3,
      },
      {
        id: 'geo-3-2',
        question: 'Triangel har vinklar 60° och 70°. Tredje vinkeln?',
        correctAnswer: '50',
        solution: [
          { step: 1, description: 'Vinkelsumma = 180°' },
          { step: 2, description: '180 - 60 - 70 = 50' },
          { step: 3, description: 'Tredje vinkeln =', result: '50°' },
        ],
        area: 'geometry',
        grade: 3,
      },
    ],
  },
};

export function generateQuiz(area: MathArea, grade: Grade, packet: number): Question[] {
  const pool = questionPools[area][grade]();
  
  // Use packet number to seed selection (so same packet = same questions)
  const seed = area.charCodeAt(0) + grade * 10 + packet * 100;
  const shuffled = [...pool].sort((a, b) => {
    const hashA = simpleHash(a.id + seed);
    const hashB = simpleHash(b.id + seed);
    return hashA - hashB;
  });
  
  // Select 10 questions (or all if less than 10)
  return shuffled.slice(0, 10);
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

export function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  // Normalize answers: remove spaces, handle different formats
  const normalizedUser = userAnswer.trim().toLowerCase().replace(/\s+/g, '');
  const normalizedCorrect = correctAnswer.trim().toLowerCase().replace(/\s+/g, '');
  
  // Try numeric comparison
  const userNum = parseFloat(normalizedUser);
  const correctNum = parseFloat(normalizedCorrect);
  
  if (!isNaN(userNum) && !isNaN(correctNum)) {
    return Math.abs(userNum - correctNum) < 0.001; // Allow small floating point errors
  }
  
  // Fallback to string comparison
  return normalizedUser === normalizedCorrect;
}

