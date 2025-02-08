let score = JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  losses:0,
  tie:0
};

updateScoreElement();

document.getElementById('rock-btn').addEventListener('click', () => playGame('Rock'));
document.getElementById('paper-btn').addEventListener('click', () => playGame('Paper'));
document.getElementById('scissors-btn').addEventListener('click', () => playGame('Scissors'));

document.getElementById('reset-btn').addEventListener('click', () => {
  score = {
    wins: 0,
    losses: 0,
    tie: 0
  };
  localStorage.removeItem('score');
  updateScoreElement();
  document.getElementById('result-el').textContent = '';
  document.getElementById('moves-el').textContent = '';
});

let isAutoPlay = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlay) {
    intervalId = setInterval(() => {
      playGame('Rock');
    }, 1000);
    isAutoPlay = true;
  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
  }
};

document.getElementById('auto-play-btn').addEventListener('click', autoPlay);


document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  }
})


function playGame(playerMove) {
  let computer = pickComputerMove();
  let result = '';

  if (playerMove === 'Rock') {
    if (computer === 'Rock') {
      result = 'Tie.';
    } else if (computer === 'Paper') {
      result = 'You lose.';
    } else if (computer === 'Scissors') {
      result = 'You win.';
    }
  } else if (playerMove === 'Paper') {
    if (computer === 'Rock') {
      result = 'You win.';
    } else if (computer === 'Paper') {
      result = 'Tie.';
    } else if (computer === 'Scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'Scissors') {
    if (computer === 'Rock') {
      result = 'You lose.';
    } else if (computer === 'Paper') {
      result = 'You win.';
    } else if (computer === 'Scissors') {
      result = 'Tie.';
    }
  }

  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.tie++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.getElementById('result-el').textContent = `${result}`;

  document.getElementById('moves-el').textContent = `You chose ${playerMove}, computer chose ${computer}.`;
  updateScoreElement();
}


function updateScoreElement() {
  document.getElementById('score-el').textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.tie}`;
}



function pickComputerMove() {
  let random = Math.random();
  let computer = '';
  if (random > 0 && random < 1/3) {
    computer = 'Rock';
  } else if (random > 1/3 && random < 2/3) {
    computer = 'Paper';
  } else if (random > 2/3 && random < 1) {
    computer = 'Scissors';
  }
  return computer;
}