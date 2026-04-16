import { resetQuestionRound } from "./questions.js";
import { showScreen } from "./screen.js";

export function initRestartQuiz() {
  const restartButton = document.querySelector("#restart-quiz");

  restartButton.addEventListener("click", function () {
    resetQuestionRound();
    showScreen("start-screen");
  });
}
