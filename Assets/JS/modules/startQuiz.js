import { getSelectedDifficulty } from "./difficulty.js";

export function initStartQuiz() {
  const startScreen = document.querySelector("#start-screen");
  const quizScreen = document.querySelector("#quiz-screen");
  const startButton = document.querySelector("#start-quiz");

  startButton.addEventListener("click", function () {
    if (!getSelectedDifficulty()) {
      alert("Choose a difficulty first");
      return;
    }

    startScreen.hidden = true;
    quizScreen.hidden = false;
  });
}
