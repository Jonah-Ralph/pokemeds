import { pokemon } from './data/pokemon.js'
import { medications } from './data/medications.js'

let score = 0
let highScore = parseInt(localStorage.getItem('pokemeds-highscore')) || 0
let currentRound = null

// Track which names have been used this game to avoid repeats
let usedPokemon = new Set()
let usedMedications = new Set()

export function getScore() {
  return score
}

export function getHighScore() {
  return highScore
}

export function getCurrentRound() {
  return currentRound
}

export function startGame() {
  score = 0
  usedPokemon = new Set()
  usedMedications = new Set()
  currentRound = newRound()
  return currentRound
}

function pickRandom(array, usedSet) {
  const available = array.filter(name => !usedSet.has(name))
  // If we've used them all, reset
  if (available.length === 0) {
    usedSet.clear()
    return array[Math.floor(Math.random() * array.length)]
  }
  const pick = available[Math.floor(Math.random() * available.length)]
  usedSet.add(pick)
  return pick
}

function newRound() {
  const poke = pickRandom(pokemon, usedPokemon)
  const med = pickRandom(medications, usedMedications)

  // Randomly assign left or right
  const pokemonOnLeft = Math.random() < 0.5

  return {
    left: pokemonOnLeft ? poke : med,
    right: pokemonOnLeft ? med : poke,
    pokemonName: poke,
    medicationName: med,
    pokemonSide: pokemonOnLeft ? 'left' : 'right',
  }
}

// Returns { correct: boolean, round, score, highScore }
export function guess(side) {
  const correct = side === currentRound.pokemonSide

  if (correct) {
    score++
    currentRound = newRound()
    return { correct: true, round: currentRound, score, highScore }
  } else {
    if (score > highScore) {
      highScore = score
      localStorage.setItem('pokemeds-highscore', highScore)
    }
    return {
      correct: false,
      finalScore: score,
      highScore,
      pokemonName: currentRound.pokemonName,
      medicationName: currentRound.medicationName,
    }
  }
}
