export function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");

  screens.forEach((screen) => {
    screen.hidden = true;
  });

  const selectedScreen = document.querySelector(`#${screenId}`);

  if (selectedScreen) {
    selectedScreen.hidden = false;
  }
}
