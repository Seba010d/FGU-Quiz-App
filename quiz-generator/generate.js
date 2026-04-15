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
  { q: "What is the capital of Germany?", o: ["Berlin", "Vienna", "Prague", "Zurich"], a: "Berlin", d: "easy" },
  { q: "What color do you get by mixing red and white?", o: ["Pink", "Purple", "Orange", "Brown"], a: "Pink", d: "easy" },
  { q: "How many days are in a week?", o: ["5", "6", "7", "8"], a: "7", d: "easy" },
  { q: "What is the boiling point of water?", o: ["90°C", "100°C", "110°C", "120°C"], a: "100°C", d: "easy" },
  { q: "Which animal is known as man's best friend?", o: ["Cat", "Dog", "Horse", "Bird"], a: "Dog", d: "easy" },
  { q: "Who painted the Mona Lisa?", o: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], a: "Da Vinci", d: "medium" },
  { q: "What is the largest planet in our solar system?", o: ["Earth", "Mars", "Jupiter", "Saturn"], a: "Jupiter", d: "medium" },
  { q: "Which country hosted the 2016 Olympics?", o: ["China", "Brazil", "UK", "Russia"], a: "Brazil", d: "medium" },
  { q: "What is H2O commonly known as?", o: ["Salt", "Water", "Oxygen", "Hydrogen"], a: "Water", d: "medium" },
  { q: "How many sides does a hexagon have?", o: ["5", "6", "7", "8"], a: "6", d: "medium" },
  { q: "What is the square root of 144?", o: ["10", "11", "12", "13"], a: "12", d: "hard" },
  { q: "Who discovered penicillin?", o: ["Newton", "Darwin", "Fleming", "Curie"], a: "Fleming", d: "hard" },
  { q: "What is the capital of Canada?", o: ["Toronto", "Vancouver", "Ottawa", "Montreal"], a: "Ottawa", d: "hard" },
  { q: "Which element has atomic number 1?", o: ["Helium", "Hydrogen", "Oxygen", "Carbon"], a: "Hydrogen", d: "hard" },
  { q: "What year did the Titanic sink?", o: ["1910", "1912", "1915", "1920"], a: "1912", d: "hard" },
  { q: "What is the capital of Spain?", o: ["Barcelona", "Madrid", "Seville", "Valencia"], a: "Madrid", d: "easy" },
  { q: "Which animal is the largest?", o: ["Elephant", "Blue Whale", "Giraffe", "Shark"], a: "Blue Whale", d: "easy" },
  { q: "What is 10 + 15?", o: ["20", "25", "30", "35"], a: "25", d: "easy" },
  { q: "Which season comes after summer?", o: ["Spring", "Autumn", "Winter", "Monsoon"], a: "Autumn", d: "easy" },
  { q: "What is the color of the sky?", o: ["Blue", "Green", "Red", "Yellow"], a: "Blue", d: "easy" },
  { q: "Which country is known for sushi?", o: ["China", "Japan", "Thailand", "Korea"], a: "Japan", d: "easy" },
  { q: "How many legs does a spider have?", o: ["6", "8", "10", "12"], a: "8", d: "easy" },
  { q: "What is 100 divided by 10?", o: ["5", "10", "20", "25"], a: "10", d: "easy" },
  { q: "Which fruit is yellow?", o: ["Apple", "Banana", "Cherry", "Grape"], a: "Banana", d: "easy" },
  { q: "What do bees produce?", o: ["Milk", "Honey", "Water", "Oil"], a: "Honey", d: "easy" },
  { q: "Who wrote 'The Hobbit'?", o: ["Rowling", "Tolkien", "Lewis", "King"], a: "Tolkien", d: "medium" },
  { q: "What is the capital of Australia?", o: ["Sydney", "Melbourne", "Canberra", "Perth"], a: "Canberra", d: "medium" },
  { q: "Which planet has rings?", o: ["Mars", "Earth", "Saturn", "Venus"], a: "Saturn", d: "medium" },
  { q: "What is 12 x 12?", o: ["124", "144", "154", "164"], a: "144", d: "medium" },
  { q: "Which metal is heavier?", o: ["Iron", "Aluminum", "Gold", "Silver"], a: "Gold", d: "medium" },
  { q: "Which language is spoken in Brazil?", o: ["Spanish", "Portuguese", "French", "English"], a: "Portuguese", d: "medium" },
  { q: "What is the tallest animal?", o: ["Elephant", "Lion", "Giraffe", "Horse"], a: "Giraffe", d: "medium" },
  { q: "Which ocean lies between Africa and Australia?", o: ["Atlantic", "Pacific", "Indian", "Arctic"], a: "Indian", d: "medium" },
  { q: "What is 7 x 8?", o: ["54", "56", "58", "60"], a: "56", d: "medium" },
  { q: "Which country has the maple leaf flag?", o: ["USA", "Canada", "UK", "Australia"], a: "Canada", d: "medium" },
  { q: "What is the derivative of x^2?", o: ["x", "2x", "x^2", "2"], a: "2x", d: "hard" },
  { q: "Who discovered gravity?", o: ["Einstein", "Newton", "Galileo", "Tesla"], a: "Newton", d: "hard" },
  { q: "What is the capital of South Korea?", o: ["Seoul", "Busan", "Incheon", "Daegu"], a: "Seoul", d: "hard" },
  { q: "Which element is represented by Fe?", o: ["Iron", "Fluorine", "Lead", "Zinc"], a: "Iron", d: "hard" },
  { q: "What year did World War I begin?", o: ["1912", "1914", "1916", "1918"], a: "1914", d: "hard" },
  { q: "What is the cube of 3?", o: ["6", "9", "27", "81"], a: "27", d: "hard" },
  { q: "Who painted the Starry Night?", o: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], a: "Van Gogh", d: "hard" },
  { q: "What is the smallest prime number?", o: ["0", "1", "2", "3"], a: "2", d: "hard" },
  { q: "Which gas is most abundant in Earth's atmosphere?", o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], a: "Nitrogen", d: "hard" },
  { q: "What is the capital of Argentina?", o: ["Lima", "Buenos Aires", "Santiago", "Bogota"], a: "Buenos Aires", d: "hard" },
  { q: "Which instrument has keys, pedals, and strings?", o: ["Guitar", "Piano", "Violin", "Drum"], a: "Piano", d: "easy" },
  { q: "How many months are in a year?", o: ["10", "11", "12", "13"], a: "12", d: "easy" },
  { q: "Which sport uses a bat and ball?", o: ["Football", "Cricket", "Tennis", "Hockey"], a: "Cricket", d: "easy" },
  { q: "What is 50 minus 20?", o: ["20", "25", "30", "35"], a: "30", d: "easy" },
  { q: "What is ice made of?", o: ["Oil", "Water", "Salt", "Air"], a: "Water", d: "easy" },
  { q: "Which continent is the largest?", o: ["Africa", "Asia", "Europe", "Antarctica"], a: "Asia", d: "medium" },
  { q: "Which country invented pizza?", o: ["France", "Italy", "USA", "Spain"], a: "Italy", d: "medium" },
  { q: "What is 15 x 3?", o: ["30", "35", "45", "50"], a: "45", d: "medium" },
  { q: "Which planet is known for its storms?", o: ["Earth", "Jupiter", "Mars", "Venus"], a: "Jupiter", d: "medium" },
  { q: "What is the currency of the UK?", o: ["Euro", "Dollar", "Pound", "Krone"], a: "Pound", d: "medium" },
];

const requestedCount = Number(process.argv[2] || questionPool.length);

function validateRequestedCount(count) {
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error("Antallet skal vaere et positivt helt tal. Eksempel: node generate.js 9");
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateQuestions(count) {
  validateRequestedCount(count);

  const questions = [];
  let pool = shuffle([...questionPool]);

  while (questions.length < count) {
    if (pool.length === 0) {
      pool = shuffle([...questionPool]);
    }

    const item = pool.pop();

    questions.push({
      id: questions.length + 1,
      question: item.q,
      options: shuffle([...item.o]),
      answer: item.a,
      difficulty: item.d,
      category: "general knowledge",
    });
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
