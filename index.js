var pomodoroTimer;
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var startButton = document.getElementById("startButton");
var pauseButton = document.getElementById("pauseButton");
var resetButton = document.getElementById("resetButton");

var totalSeconds = 0;
var isPaused = false;
var isBreak = false;

function startTimer() {
  if (!pomodoroTimer) {
    pomodoroTimer = setInterval(setTime, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
  } else {
    resumeTimer();
  }
}

function pauseTimer() {
  clearInterval(pomodoroTimer);
  pomodoroTimer = null;
  isPaused = true;
  startButton.innerHTML = "Continuar";
}

function resumeTimer() {
  pomodoroTimer = setInterval(setTime, 1000);
  isPaused = false;
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
}

function resetTimer() {
  clearInterval(pomodoroTimer);
  pomodoroTimer = null;
  totalSeconds = 0;
  isPaused = false;
  isBreak = false;
  startButton.innerHTML = "Iniciar";
  minutesLabel.innerHTML = "25";
  secondsLabel.innerHTML = "00";
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
}

function setTime() {
  if (!isPaused) {
    ++totalSeconds;
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;

    minutesLabel.innerHTML = padTime(minutes);
    secondsLabel.innerHTML = padTime(seconds);

    if (minutes === 25 && seconds === 0 && !isBreak) {
      // Intervalo de estudo concluído, iniciar intervalo de descanso
      clearInterval(pomodoroTimer);
      pomodoroTimer = null;
      totalSeconds = 0;
      isBreak = true;
      minutesLabel.innerHTML = "05";
      secondsLabel.innerHTML = "00";
      startTimer();
    } else if (minutes === 5 && seconds === 0 && isBreak) {
      // Intervalo de descanso concluído, reiniciar o ciclo de estudo
      clearInterval(pomodoroTimer);
      pomodoroTimer = null;
      totalSeconds = 0;
      isBreak = false;
      minutesLabel.innerHTML = "25";
      secondsLabel.innerHTML = "00";
      startTimer();
    }
  }
}

function padTime(time) {
  return String(time).padStart(2, "0");
}
