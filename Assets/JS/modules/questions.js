let questionsCache = [];
let activeQuestions = [];
let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0;

function shuffleQuestions(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export async function loadQuestions() {
  if (questionsCache.length > 0) {
    return questionsCache;
  }

  const response = await fetch("./Assets/data/questions.json");
  const data = await response.json();

  questionsCache = data.questions;
  return questionsCache;
}

export async function getQuestionsByDifficulty(difficulty) {
  const questions = await loadQuestions();

  return questions.filter((question) => question.difficulty === difficulty);
}

export async function startQuestionRound(difficulty) {
  const filteredQuestions = await getQuestionsByDifficulty(difficulty);
  const randomQuestions = shuffleQuestions(filteredQuestions).slice(0, 5);

  activeQuestions = randomQuestions;
  currentQuestionIndex = 0;
  selectedAnswer = null;
  score = 0;

  return activeQuestions;
}

export function renderQuestion(question, currentQuestionNumber, totalQuestions) {
  const questionCounter = document.querySelector("#question-counter");
  const questionTitle = document.querySelector("#question-title");
  const answerList = document.querySelector("#answer-list");
  const nextButton = document.querySelector("#next-question");

  questionCounter.textContent = `Question ${currentQuestionNumber} of ${totalQuestions}`;
  questionTitle.textContent = question.question;
  answerList.innerHTML = "";
  selectedAnswer = null;
  nextButton.textContent = currentQuestionNumber === totalQuestions ? "Finish Quiz" : "Next Question";

  question.options.forEach((option, index) => {
    const answerButton = document.createElement("button");
    const answerLetter = String.fromCharCode(65 + index);

    answerButton.className = "answer-list__option";
    answerButton.type = "button";
    answerButton.textContent = `${answerLetter}) ${option}`;

    answerButton.addEventListener("click", function () {
      const answerButtons = document.querySelectorAll(".answer-list__option");

      answerButtons.forEach((button) => {
        button.classList.remove("is-selected");
      });

      selectedAnswer = option;
      answerButton.classList.add("is-selected");
    });

    answerList.append(answerButton);
  });
}

export function showCurrentQuestion() {
  if (activeQuestions.length === 0) {
    return false;
  }

  const currentQuestion = activeQuestions[currentQuestionIndex];

  renderQuestion(currentQuestion, currentQuestionIndex + 1, activeQuestions.length);
  return true;
}

export function goToNextQuestion() {
  if (activeQuestions.length === 0) {
    return "empty";
  }

  if (!selectedAnswer) {
    return "no-answer";
  }

  const currentQuestion = activeQuestions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    score += 1;
  }

  if (currentQuestionIndex >= activeQuestions.length - 1) {
    return "finished";
  }

  currentQuestionIndex += 1;
  showCurrentQuestion();
  return "next";
}

export function showResult() {
  const finalScore = document.querySelector("#final-score");

  finalScore.textContent = `${score} / ${activeQuestions.length}`;
}

export function resetQuestionRound() {
  activeQuestions = [];
  currentQuestionIndex = 0;
  selectedAnswer = null;
  score = 0;
}
