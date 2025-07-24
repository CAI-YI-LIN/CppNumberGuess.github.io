let startTime = 0;
let interval;

function start() {
  const name = document.getElementById('playerName').value;
  const difficulty = parseInt(document.getElementById('difficulty').value);

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  Module.ccall('startGame', null, ['number'], [difficulty]);
  document.getElementById('setup').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  document.getElementById('result').textContent = '';
  document.getElementById('instruction').textContent = `Good luck, ${name}!`;

  startTime = Date.now();
  interval = setInterval(updateTimer, 100);
}

function updateTimer() {
  const elapsed = (Date.now() - startTime) / 1000;
  document.getElementById('timer').textContent = `⏱ Time: ${elapsed.toFixed(1)}s`;
}

function submit() {
  const guess = parseInt(document.getElementById('guessInput').value);
  if (isNaN(guess)) return;

  const response = Module.ccall('submitGuess', 'string', ['number'], [guess]);
  document.getElementById('result').textContent = response;

  if (response.includes('Correct!')) {
    clearInterval(interval);
    document.getElementById('restartBtn').style.display = 'inline-block';  // 顯示再玩一次按鈕
  }
}
function restart() {
  document.getElementById('setup').style.display = 'block';   // 顯示開始設定
  document.getElementById('game').style.display = 'none';    // 隱藏遊戲區
  document.getElementById('restartBtn').style.display = 'none'; // 隱藏再玩一次按鈕
  document.getElementById('guessInput').value = '';          // 清空輸入框
  document.getElementById('result').textContent = '';        // 清空結果訊息
  document.getElementById('timer').textContent = '⏱ Time: 0.0s'; // 重置計時顯示
}

// 等待 Module 載入
Module.onRuntimeInitialized = () => {
  console.log("WASM Ready");
};

function downloadLeaderboard() {
  // 透過 Module.FS 讀檔
  try {
    const data = Module.FS.readFile('leaderboard.txt', { encoding: 'utf8' });
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'leaderboard.txt';
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    alert("No leaderboard data found.");
  }
}
