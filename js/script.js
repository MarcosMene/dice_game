'use strict';
//players
const player1 = document.querySelector('.player__1');
const player2 = document.querySelector('.player__2');

//score players
const scorePlayer1 = document.querySelector('.player__1__score');
const scorePlayer2 = document.querySelector('.player__2__score');

//current players
const currentPlayer1 = document.querySelector('.current__1');
const currentPlayer2 = document.querySelector('.current__2');

//dice

const diceDiv = document.querySelector('.dice');
const diceImg = document.querySelector('.dice img');

//buttons
const btnNew = document.querySelector('.btn__newgame');
const btnRoll = document.querySelector('.btn__rolldice');
const btnHold = document.querySelector('.btn__hold');

//score values
scorePlayer1.textContent = 0;
scorePlayer2.textContent = 0;

diceImg.classList.add('hidden');

let currentScore = 0;
const scorePlayers = [0, 0];
let activePlayer = 1;
let playing = false;

//rolling a dice
const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`.current__${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1.classList.toggle('active');
  player2.classList.toggle('active');
};

let active = 1;

btnNew.addEventListener('click', () => {
  playing = true;

  activePlayer = 1;
  document.querySelector('.player__1').classList.add('active');
  document.querySelector('.player__2').classList.remove('active');
  document.querySelector('.player__1').classList.remove('winner');
  document.querySelector('.player__2').classList.remove('winner');
  scorePlayers[0] = 0;
  scorePlayers[1] = 0;
  document.querySelector('.player__1__score').textContent = 0;
  document.querySelector('.player__2__score').textContent = 0;
  diceDiv.classList.add('dice--grayscale');
  diceImg.src = `./assets/images/dice_1.png`;
});

btnRoll.addEventListener('click', () => {
  if (playing) {
    diceImg.classList.remove('hidden');
    diceDiv.classList.remove('dice--grayscale');
    diceImg.classList.toggle('dice--rotation');
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceImg.src = `./assets/images/dice_${diceNumber}.png`;
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.querySelector(`.current__${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scorePlayers[activePlayer - 1] += currentScore;
    document.querySelector(`.player__${activePlayer}__score`).textContent =
      scorePlayers[activePlayer - 1];
    if (scorePlayers[activePlayer - 1] >= 20) {
      playing = false;
      diceImg.classList.add('hidden');
      document.querySelector(`.player__${activePlayer}__score`).textContent =
        'Winner!';
      document
        .querySelector(`.player__${activePlayer}`)
        .classList.add('winner');
      switchPlayer();

      document.querySelector(`.player__${activePlayer}__score`).textContent =
        'Lost!';
      document
        .querySelector(`.player__${activePlayer}`)
        .classList.remove('active');

      diceDiv.classList.add('dice--grayscale');

      active = activePlayer === 2 ? 1 : 2;
      document.querySelector(`.player__${active}`);
    } else {
      switchPlayer();
    }
  }
});
