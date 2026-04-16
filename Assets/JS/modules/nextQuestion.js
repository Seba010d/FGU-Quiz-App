import { goToNextQuestion, showResult } from "./questions.js";
import { showScreen } from "./screen.js";

export function initNextQuestion() {
  const nextButton = document.querySelector("#next-question");

  nextButton.addEventListener("click", function () {
    const questionState = goToNextQuestion();

    if (questionState === "no-answer") {
      alert("Choose an answer first");
      return;
    }

    if (questionState === "finished") {
      showResult();
      showScreen("result-screen");
    }
  });
}
