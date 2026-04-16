import { getSelectedDifficulty } from "./difficulty.js";
import { showCurrentQuestion, startQuestionRound } from "./questions.js";
import { showScreen } from "./screen.js";

export function initStartQuiz() {
  const startButton = document.querySelector("#start-quiz");

  startButton.addEventListener("click", async function () {
    const selectedDifficulty = getSelectedDifficulty();

    if (!selectedDifficulty) {
      alert("Choose a difficulty first");
      return;
    }

    const questions = await startQuestionRound(selectedDifficulty);

    if (questions.length === 0) {
      alert("No questions found for this difficulty");
      return;
    }

    showCurrentQuestion();
    showScreen("quiz-screen");
  });
}
