<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Number Guessing Game</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Number Guessing Game</h1>

  <div id="setup">
    <input id="playerName" placeholder="Enter your name" />
    <select id="difficulty">
      <option value="10">Easy (1~10)</option>
      <option value="100" selected>Normal (1~100)</option>
      <option value="1000">Hard (1~1000)</option>
    </select>
    <br />
    <button id="startBtn">Start Game</button>
  </div>

  <div id="game" class="hidden">
    <p id="instruction"></p>
    <input id="guessInput" type="number" placeholder="Enter your guess number" />
    <button id="guessBtn">Guess!</button>
    <p id="result"></p>
    <p id="timer">⏱ Time: 0.0s</p>
    <button id="restartBtn">Play Again</button>
  </div>

  <script src="script.js"></script>
</body>
</html>
