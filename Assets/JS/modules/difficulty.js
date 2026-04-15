let selectedDifficulty = null;

export function initDifficulty() {
  const difficultyButtons = document.querySelectorAll("[data-difficulty]");

  difficultyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      selectedDifficulty = button.dataset.difficulty;

      difficultyButtons.forEach((btn) => {
        btn.classList.remove("is-selected");
      });

      button.classList.add("is-selected");
    });
  });
}

export function getSelectedDifficulty() {
  return selectedDifficulty;
}
