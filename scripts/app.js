function init() {


  // Elements
  const grid = document.querySelector('.grid')
  const width = 10
  const cellCount = width * width
  const cells = [] 

  const resetBtn = document.querySelector('#reset-btn')

  let lives = 3
  let score = 0

  //Mario
  const marioClass = 'mario'
  const marioStartPosition = 94
  let marioCurrentPosition = marioStartPosition

  //Goombas
  const goombas = [89, 87, 84]
  const goombasClass = 'goomba'

  //Bomb
  const bomb = [60, 63, 65]
  const bombClass = 'bomb'

  //Blue Mushrooms
  const blueMushroom = [24,26, 40, 42, 44]
  const blueMushroomClass = 'blue-mushroom'

  // Stars
  const star = [34, 18, 12]
  const starClass = 'star'

  // Classes for styling the gird 
  const homeClass = 'home'
  const homeIconsClass = 'homeicons'
  const riverClass = 'river'
  const safeClass = 'safe'
  const startClass = 'start'
  const roadClass = 'road'

  //Overlay elements
  const gamePopUps = document.querySelectorAll('popUps')
  const buttons = document.querySelectorAll('buttons')
  const gameOverOverlay = document.querySelector('.game-over-popUp-container')
  const winGameOveraly = document.querySelector('start-game-popUp-container')


  


  //Functions

  //Start Game 

  function startGame{
    
  }




  //Function to create a by 10 by 10
  function createGrid(marioStartPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i 
      grid.appendChild(cell)
      cells.push(cell) 

      // Control flow to create classes for styling cells (update at the end)
      if (i === 0 || i === 9 ){
        cell.classList.add(homeIconsClass)
      } else if (i >= 1 && i <= 8 && i % 2 === 0) {
        cell.classList.add(riverClass) // homeicons - organge  sqaures 
      } else if (i >= 0 && i < 9 && i % 2 !== 0) {
        cell.classList.add(homeClass) // home  - pink squares
      } else if (i >= 10 && i <= 49) {
        cell.classList.add(riverClass) // river - river collision 
      } else if (i >= 50 && i <= 59) {
        cell.classList.add(safeClass) // safe - highlighter pink  
      } else if (i >= 60 && i <= 69){
        cell.classList.add(roadClass) //  road - classgrey sqaures 
      } else if (i >= 70 && i <= 79) {
        cell.classList.add(safeClass) //  safe - highlighter pink
      } else if (i >= 80 && i <= 89) {
        cell.classList.add(roadClass) //  road - classgrey sqaures 
      } else if (i >= 90 && i <= 99) {
        cell.classList.add(startClass) //  start - green sqaures 
      } else {
        console.log('classes added')
      } 
    }
    addMario(marioStartPosition)
    displayLives()
  }

  // Function to add the Mario
  function addMario(position) {
    cells[position].classList.add(marioClass)
  }

  // Function to remove Mario
  function removeMario(position) {
    cells[position].classList.remove(marioClass)
  }


  // Function to move Mario
  function moveMario(e) {

    const key = e.keyCode
    const left = 37
    const right = 39
    const up = 38
    const down = 40

    removeMario(marioCurrentPosition)

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
    winGame()
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
  }

  //Function to resetGame
  // function resetGame() { //reset positions of Marios at home
  //   // const divHomeClass = document.querySelectorAll('race-car')
  //   // divHomeClass.style.display = 'none'
  //   score = 0
  //   displayScore()
  //   lives = 0 
  //   displayLives()
  //   removeMario(marioCurrentPosition)
  //   addMario(marioStartPosition)
  // }

  // Function for for game over
  // function gameOver(){
  //   resetGame()
  // }

  // Function to check for win 
  function winGame(){
    if (score === 4000) {
      // winPopUp.style.display = 'block'
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
        cells[marioCurrentPosition].classList.contains(bombClass)  ||
        cells[marioCurrentPosition].classList.contains(riverClass)) {
      console.log('collision')
      removeMario(marioCurrentPosition)
      marioCurrentPosition = marioStartPosition
      addMario(marioCurrentPosition)
      lives --
      displayLives()
    }
  }

  //Function to move Goombos Left
  function moveGoombas() {
    goombas.forEach((position, index) => {
      if (position === 80) { 
        goombas[index] += width - 1
        cells[position].classList.remove(goombasClass)
        cells[position += width - 1].classList.add(goombasClass)
      } else { //Tiggers the movement of each obstacle by reducing the index by 1 and adding/removing the Goombo class
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
      } else { //Tiggers the movement of each obstacle by reducing the index by 1 and adding/removing the Goombo class
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
        marioCurrentPosition -= width
      }
      removeMario(marioCurrentPosition)
      marioCurrentPosition += 1 
      addMario(marioCurrentPosition)
    } 
    blueMushroom.forEach((position, index) => {
      if (position === 29 || position === 49) {
        blueMushroom[index] -= width - 1
        cells[position].classList.remove(blueMushroomClass)
        cells[position -= width - 1].classList.add(blueMushroomClass)
      } else { //Tiggers the movement of each obstacle by reducing the index by 1 and adding/removing the obstacle class
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
        marioCurrentPosition += width
      }
      removeMario(marioCurrentPosition)
      marioCurrentPosition -= 1
      addMario(marioCurrentPosition)
    }
    star.forEach((position, index) => {
      if (position === 30 || position === 10) { 
        star[index] += width - 1
        cells[position].classList.remove(starClass)
        cells[position += width - 1].classList.add(starClass)
      } else { //Tiggers the movement of each obstacle by reducing the index by 1 and adding/removing the obstacle class
        star[index] -= 1
        cells[position].classList.remove(starClass)
        cells[position -= 1].classList.add(starClass)
      }
    })
  }
  
  //Function to control the movement of all moving obstacles
  function moveObjects() {
    const timer = setInterval(() => {
      moveGoombas()
      moveBomb()
      moveStars()
      moveBlueMushrooms()
      collision()
      // console.log(timer)
    },750)
    winGame()
  }

  createGrid(marioStartPosition)
  moveObjects()


  //Events
  document.addEventListener('keydown', moveMario)
  
}

window.addEventListener('DOMContentLoaded', init)
