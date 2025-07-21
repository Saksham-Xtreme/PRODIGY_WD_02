let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function updateDisplay() {
  const time = elapsedTime;
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  // Update digital display
  document.getElementById("display").textContent =
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Update royal analog clock
  rotateHands(hours, minutes, seconds);
}

function rotateHands(hours, minutes, seconds) {
  const hourDeg = ((hours % 12) + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const secondDeg = seconds * 6;

  document.getElementById("hourHand").style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
  document.getElementById("minuteHand").style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  document.getElementById("secondHand").style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

function startStopwatch() {
  if (running) return;
  running = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 1000);
}

function pauseStopwatch() {
  if (!running) return;
  running = false;
  clearInterval(timerInterval);
}

function resetStopwatch() {
  running = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  rotateHands(0, 0, 0);
}

// Initial state
updateDisplay();
