let target = 0;
let maxNum = 100;
let attempts = 0;
let startTime = 0;
let interval = null;
let playerName = "";

function startGame() {
  playerName = document.getElementById("playerName").value.trim();
  maxNum = parseInt(document.getElementById("difficulty").value);
  if (!playerName) {
    alert("Please enter your name!");
    return;
  }

  target = Math.floor(Math.random() * maxNum) + 1;
  attempts = 0;
  startTime = Date.now();

  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("instruction").textContent = `Good luck, ${playerName}! Guess a number between 1 and ${maxNum}.`;
  document.getElementById("result").textContent = "";
  document.getElementById("guessInput").value = "";
  updateTimer();
  interval = setInterval(updateTimer, 100);
}

function updateTimer() {
  const elapsed = (Date.now() - startTime) / 1000;
  document.getElementById("timer").textContent = `⏱ Time: ${elapsed.toFixed(1)}s`;
}

function submitGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  if (isNaN(guess)) return;

  attempts++;

  const result = document.getElementById("result");
  if (guess > target) result.textContent = "Too high!";
  else if (guess < target) result.textContent = "Too low!";
  else {
    clearInterval(interval);
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(1);
    result.textContent = `Congrats ${playerName}, you guessed it right!\n You took ${attempts} attempts and ${timeTaken} seconds.`;
  }
}

function restartGame() {
  document.getElementById("game").classList.add("hidden");
  document.getElementById("setup").classList.remove("hidden");
}
