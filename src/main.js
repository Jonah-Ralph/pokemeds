import { startGame, guess, getScore, getHighScore, getCurrentRound } from './game.js'

const app = document.getElementById('app')

function renderTitle() {
  app.innerHTML = `
    <h1 class="title">Pokemon or Medication?</h1>
    <p class="subtitle">Two names. One is a Pokemon, one is a medication. Pick the Pokemon.</p>
    <button class="start-btn">Start Game</button>
  `
  app.querySelector('.start-btn').addEventListener('click', () => {
    startGame()
    renderRound()
  })
}

function renderRound() {
  const round = getCurrentRound()
  app.innerHTML = `
    <h1 class="title">Pokemon or Medication?</h1>
    <div class="score-bar">
      <span>Streak: <strong>${getScore()}</strong></span>
      <span>Best: <strong>${getHighScore()}</strong></span>
    </div>
    <div class="cards">
      <div class="card" data-side="left">${round.left}</div>
      <div class="card" data-side="right">${round.right}</div>
    </div>
    <p class="subtitle">Which one is the Pokemon?</p>
  `
  app.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const side = card.dataset.side
      const result = guess(side)
      if (result.correct) {
        renderRound()
      } else {
        renderGameOver(result)
      }
    })
  })
}

function renderGameOver(result) {
  const isNewHigh = result.finalScore > 0 && result.finalScore === result.highScore
  app.innerHTML = `
    <div class="game-over">
      <h2>Game Over!</h2>
      <p class="final-score">Your streak: <strong>${result.finalScore}</strong></p>
      <p class="high-score">Best streak: ${result.highScore}</p>
      ${isNewHigh ? '<p class="new-high-score">New high score!</p>' : ''}
      <div class="answer-reveal">
        <p><span class="pokemon-name">${result.pokemonName}</span> is the Pokemon</p>
        <p><span class="med-name">${result.medicationName}</span> is the medication</p>
      </div>
      <button class="play-again-btn">Play Again</button>
    </div>
  `
  app.querySelector('.play-again-btn').addEventListener('click', () => {
    startGame()
    renderRound()
  })
}

renderTitle()
