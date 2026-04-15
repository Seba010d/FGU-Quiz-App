const fs = require("fs");
const path = require("path");

const questionPool = [
  { q: "What is the capital of France?", o: ["Berlin", "Madrid", "Paris", "Rome"], a: "Paris", d: "easy" },
  { q: "Which planet is known as the Red Planet?", o: ["Earth", "Mars", "Jupiter", "Saturn"], a: "Mars", d: "easy" },
  { q: "How many continents are there?", o: ["5", "6", "7", "8"], a: "7", d: "easy" },

  { q: "Who wrote 'Romeo and Juliet'?", o: ["Dickens", "Shakespeare", "Twain", "Austen"], a: "Shakespeare", d: "medium" },
  { q: "What is the largest ocean?", o: ["Atlantic", "Indian", "Pacific", "Arctic"], a: "Pacific", d: "medium" },
  { q: "What gas do plants absorb?", o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], a: "Carbon Dioxide", d: "medium" },

  { q: "What is the chemical symbol for gold?", o: ["Au", "Ag", "Fe", "Pb"], a: "Au", d: "hard" },
  { q: "In which year did WWII end?", o: ["1942", "1945", "1939", "1918"], a: "1945", d: "hard" },
  { q: "Who developed general relativity?", o: ["Newton", "Einstein", "Tesla", "Bohr"], a: "Einstein", d: "hard" },
];

const requestedCount = Number(process.argv[2] || questionPool.length);

function validateRequestedCount(count) {
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error("Antallet skal vaere et positivt helt tal. Eksempel: node generate.js 9");
  }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateQuestions(count) {
  validateRequestedCount(count);
  const questions = [];

  while (questions.length < count) {
    const shuffled = shuffle([...questionPool]);

    for (const item of shuffled) {
      if (questions.length >= count) {
        break;
      }

      questions.push({
        id: questions.length + 1,
        question: item.q,
        options: shuffle([...item.o]),
        answer: item.a,
        difficulty: item.d,
        category: "general knowledge",
      });
    }
  }

  return questions;
}

const data = {
  questions: generateQuestions(requestedCount),
};

const outputDirectory = path.join(__dirname, "..", "Assets", "data");
const outputFile = path.join(outputDirectory, "questions.json");

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));

console.log(`Generated ${data.questions.length} questions in ${outputFile}`);
