function init() {


  // ELEMENTS 
  const grid = document.querySelector('.grid')
  const width = 10
  const cellCount = width * width
  const cells = []

  let lives = 3
  let score = 0

  //Mario
  const marioClass = 'mario'
  const marioStartPosition = 94
  let marioCurrentPosition = marioStartPosition

  const marioOnMushroomClass = 'activate-mushroom'
  const marioOnStarClass  = 'activate-star'
 
  //Goombas
  const goombas = [89, 87, 85, 81]
  const goombasClass = 'goomba'

  //Bomb
  const bomb = [60, 63, 65, 67]
  const bombClass = 'bomb'

  //Blue Mushrooms
  const blueMushroom = [24, 26, 40, 42, 44]
  const blueMushroomClass = 'blue-mushroom'

  // Stars
  const star = [34, 18, 12]
  const starClass = 'star'

  // Classes for styling the gird 
  const homeClass = 'home'
  const riverClass = 'river'
  const safeClass = 'safe'
  const startClass = 'start'
  const roadClass = 'road'

  //Overlay elements
  const startGameOverlay = document.querySelector('.start-game-popUp-container')
  const gameOverOverlay = document.querySelector('.game-over-popUp-container')
  const winGameOverlay = document.querySelector('.win-popUp-container')
  const resetBtn = document.querySelectorAll('.reset-btn')
  const startBtn = document.querySelector('.start-btn')


  //FUNCTIONS

  //Function to create a by 10 by 10
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)

      if (i === 0 || i === 9) {
        cell.classList.add(riverClass)
      } else if (i >= 1 && i <= 8 && i % 2 === 0) {
        cell.classList.add(riverClass)
      } else if (i >= 0 && i < 9 && i % 2 !== 0) {
        cell.classList.add(homeClass)
      } else if (i >= 10 && i <= 49) {
        cell.classList.add(riverClass)
      } else if (i >= 50 && i <= 59) {
        cell.classList.add(safeClass)
      } else if (i >= 60 && i <= 69) {
        cell.classList.add(roadClass)
      } else if (i >= 70 && i <= 79) {
        cell.classList.add(safeClass)
      } else if (i >= 80 && i <= 89) {
        cell.classList.add(roadClass)
      } else if (i >= 90 && i <= 99) {
        cell.classList.add(startClass)
      } else {
        console.log('classes added')
      }
    }
  }

  // Function to start the game
  function startGame() {
    console.log('game started')
    startGameOverlay.classList.remove('activate-popup')
    createGrid()
    addMario(marioStartPosition)
    moveObstacles()
    displayLives()
    displayScore()
  }

  // Function to add the Mario
  function addMario(position) {
    cells[position].classList.add(marioClass)
  }

  // Function to remove Mario
  function removeMario(position) {
    cells[position].classList.remove(marioClass)
  }

  // Function to remove Mario on mushrooms and obstacles
  function removeMarioOnObstacles(){
    cells[marioCurrentPosition].classList.remove(marioOnMushroomClass)
    cells[marioCurrentPosition].classList.remove(marioOnStarClass)
  }

  // Function to move Mario
  function moveMario(e) {

    const key = e.keyCode
    const left = 37
    const right = 39
    const up = 38
    const down = 40

    removeMario(marioCurrentPosition)
    removeMarioOnObstacles()

    if (key === right && marioCurrentPosition % width !== width - 1) {
      marioCurrentPosition++
    } else if (key === left && marioCurrentPosition % width !== 0) {
      marioCurrentPosition--
    } else if (key === up && marioCurrentPosition >= width) {
      marioCurrentPosition -= width
    } else if (key === down && marioCurrentPosition + width <= cellCount - 1) {
      marioCurrentPosition += width
    } else {
      console.log('invalid key')
    }
    addMario(marioCurrentPosition)
    collision()
    displayScore()
    gameOver()
  }

  // Function to display lives
  function displayLives() {
    const livesRemaining = document.querySelector('#lives')
    livesRemaining.innerText = ` ${lives}`
  }

  // Function to display score
  function displayScore() {
    const currentScore = document.querySelector('#score')
    currentScore.innerText = ` ${score}`
    console.log(score)
  }

  // Function to resetGame
  function resetGame() {
    window.location.reload()
  }

  //Function for for game over
  function gameOver(){
    if (lives === 0 ) {
      gameOverOverlay.classList.add('activate-popup')
    } 
  }

  //Function to check for win 
  function winGame() {
    if (score >= 4000) {
      winGameOverlay.classList.add('activate-popup')
    } else if (cells[marioCurrentPosition].classList.contains(homeClass)) {
      score += 1000
      displayScore()
      removeMario(marioCurrentPosition)
      cells[marioCurrentPosition].classList.add('race-car')
      marioCurrentPosition = marioStartPosition
      addMario(marioCurrentPosition)
    }
  }

  //Function to check for collisions
  function collision() {
    if (cells[marioCurrentPosition].classList.contains(riverClass) &&
      cells[marioCurrentPosition].classList.contains(blueMushroomClass) ||
      (cells[marioCurrentPosition].classList.contains(riverClass) &&
        cells[marioCurrentPosition].classList.contains(starClass))) {
      console.log('no collision')
    } else if (cells[marioCurrentPosition].classList.contains(goombasClass) ||
      cells[marioCurrentPosition].classList.contains(bombClass) ||
      cells[marioCurrentPosition].classList.contains(riverClass)) {
      console.log('collision triggered')
      removeMario(marioCurrentPosition)
      marioCurrentPosition = marioStartPosition
      addMario(marioCurrentPosition)
      lives--
      displayLives()
    } else {
      winGame()
    }
  }

  //Function to move Goombos Left
  function moveGoombas() {
    goombas.forEach((position, index) => {
      if (position === 80) {
        goombas[index] += width - 1
        cells[position].classList.remove(goombasClass)
        cells[position += width - 1].classList.add(goombasClass)
      } else { // Movement
        goombas[index] -= 1
        cells[position].classList.remove(goombasClass)
        cells[position -= 1].classList.add(goombasClass)
      }
    })
  }

  //Function to move Bombs right
  function moveBomb() {
    bomb.forEach((position, index) => {
      if (position === 69) {
        bomb[index] -= width - 1
        cells[position].classList.remove(bombClass)
        cells[position -= width - 1].classList.add(bombClass)
      } else { // Movement
        bomb[index] += 1
        cells[position].classList.remove(bombClass)
        cells[position += 1].classList.add(bombClass)
      }
    })
  }

  //Function to move blue mushrooms right
  function moveBlueMushrooms() {
    if (cells[marioCurrentPosition].classList.contains(blueMushroomClass)) {
      if (marioCurrentPosition === 49 || marioCurrentPosition === 29) {
        removeMario(marioCurrentPosition)
        //remove mario on a mushroom class from mario current position 
        cells[marioCurrentPosition].classList.remove(marioOnMushroomClass)
        marioCurrentPosition -= width
      }
      removeMario(marioCurrentPosition)
      cells[marioCurrentPosition].classList.remove(marioOnMushroomClass)
      marioCurrentPosition += 1
      addMario(marioCurrentPosition)
      cells[marioCurrentPosition].classList.add(marioOnMushroomClass)
    }
    blueMushroom.forEach((position, index) => {
      if (position === 29 || position === 49) {
        blueMushroom[index] -= width - 1
        cells[position].classList.remove(blueMushroomClass)
        cells[position -= width - 1].classList.add(blueMushroomClass)
      } else { // Movement
        blueMushroom[index] += 1
        cells[position].classList.remove(blueMushroomClass)
        cells[position += 1].classList.add(blueMushroomClass)
      }
    })
  }

  // Functions to move stars left
  function moveStars() {
    if (cells[marioCurrentPosition].classList.contains(starClass)) {
      if (marioCurrentPosition === 10 || marioCurrentPosition === 30) {
        removeMario(marioCurrentPosition)
        cells[marioCurrentPosition].classList.remove(marioOnStarClass)
        marioCurrentPosition += width
      }
      removeMario(marioCurrentPosition)
      cells[marioCurrentPosition].classList.remove(marioOnStarClass)
      marioCurrentPosition -= 1
      addMario(marioCurrentPosition)
      cells[marioCurrentPosition].classList.add(marioOnStarClass)
    }
    star.forEach((position, index) => {
      if (position === 30 || position === 10) {
        star[index] += width - 1
        cells[position].classList.remove(starClass)
        cells[position += width - 1].classList.add(starClass)
      } else { //Movement
        star[index] -= 1
        cells[position].classList.remove(starClass)
        cells[position -= 1].classList.add(starClass)
      }
    })
  }

  //Function to control the movement of all moving obstacles
  function moveObstacles() {
    const goombasInterval = setInterval(moveGoombas, 600)
    const bombInterval = setInterval(moveBomb, 600)
    const mushroomInterval = setInterval(moveBlueMushrooms, 700)
    const StarsInterval = setInterval(moveStars, 700)
    const collisionInterval = setInterval(collision, 500)
  }

  //EVENTS 

  document.addEventListener('keydown', moveMario)
  startBtn.addEventListener('click', startGame)
  resetBtn.forEach(button => button.addEventListener('click', resetGame))

}

window.addEventListener('DOMContentLoaded', init)