

![alt text](https://i.imgur.com/lzVI3d8.png)


# General Assembly: Software Engineering Immersive

## Mario Grid Game 

https://marilynpoku.github.io/SEI-Project-One/ 

### Overview 

My very first solo project with GA, building a grid-based game using Vanilla JavaScript, HTML and CSS. I built my own version of the frogger game which consolidated my knowledge of the fundamentals of Vanilla JavaScript. The functionality of the game includes, win logic, auto generated obstacles, collision detection and setIntervals.

### Game Screenshot 

![alt text](https://i.imgur.com/y4rTd89.jpg)

### Project Brief 

- Render a game in the browser
- Be built on a grid: do not use HTML Canvas for this 
- Design logic for winning - visually display which player won
- Include separate HTML/ CSS/ JavaScript files 
- Stick with KISS (keep it simple stupid) and DRY (don’t repeat yourself)
- Use JavaScript for DOM manipulation 
- Deploy your game online where the rest of the world can access it 
- Use semantic markup for HTML and CSS
- The idea of Frogger is to guide a family of frogs across a road and a river to their homes at the top of the screen 
- To make things more challenging there are numerous moving obstacles that the frogs must avoid to reach their destination
- The game should be player able for one player 
- The obstacles should be auto generated 
- Project to be completed in 1 week

### Technologies used

- JavaScript 
- HTML
- CSS
- Git and GitHub

### Approach taken 

#### Planning

I initially spent a couple of hours planning and pseudo coding the general logic of the game. This allowed me to plan my week and give myself daily targets of what needed to be achieved.

#### Wireframes

I designed the wireframe using Balsamiq.

![alt text](https://i.imgur.com/WbTONa2.jpg)

#### Setting up the grid

To create the grid dynamically I used a for loop to create the individual cells for the grid and appended them to the parent element, the grid. The initial code included cells.innerText = i so that the inner text of the div will display the index shown by the screenshot below. This was used for visual purposes only to plan the layout of the grid and was removed.

Control flow was used to apply styling to the grid using a DOM manipulation method of classList.add based on the index of the cell. 

![alt text](https://i.imgur.com/s0KM7NI.jpg)
![alt text](https://i.imgur.com/Nn2XkCe.jpg)

#### Movement of player and obstacles 

#### Mario

The starting position of the player was defined in a variable based on the cell index. The movement of the character was controlled using arrow keys denoted by the moveMario function which would add and remove the class of Mario based on the player's current position on the grid. 

#### Bombs and Goombas 

The movement of the bombs and goombas are all auto generated as required by the brief. The starting position of these obstacles are defined by saving the index (starting position) of the cell to an array. The movement was controlled by iterating over each index in the array using a forEach loop and adding and removing the respective class. The movement of the obstacles resets when the obstacles hit the end of the grid. The speed of the obstacles is controlled by the moveObstacles function which invokes the movement in a setInterval. 

#### Stars and Mushrooms

The movement and starting position follow a similar logic of that for the bombs and goombas. The added complexity was ensuring that the Mario would move with the obstacles. I created a separate class for Mario on the obstacles in the water and incremented the players movement by one if the player didn’t move the arrow keys so that Mario was moving with the stars or mushrooms. 

#### Game overlays

The game overlays were created using HTML and CSS using an activate-popup class to trigger the activation of the pop-ups using DOM manipulation methods. The start game overlay is activated initially and removed when the player clicks on the start button and invokes the startGame function which removes the class of activate-popup. 

A similar logic was used for the gameOver and WinGame function, however in this instance the activate-pop up class was added to the overlays when the gameOver and winGame functions were called.

### Challenges

The biggest challenge was the logic involved with the collision detection. At first without the initial if statement with the console log detailing no collision. The player automatically started back at the game start position even if the player's current position contained the blue mushroom and river class. Adding the initial if statement and lowering the time on the setInterval which invoked the collision function helped resolve this.

![alt text](https://i.imgur.com/wwMcAwD.jpg)

### Bugs

- Sometimes the gameOver function is not triggered when the score is less than 0 until the player attempts to move Mario again

### Wins 

- I was very happy with the overall theme and adaption of the classic frogger game
- I was very pleased to produce a viable application which family and friends could play 

### Future Improvements

- Different difficult levels 
- High score board with local storage 
- Two player mode on the same computer 
- Responsive design
- Countdown clock 


### Key learnings 

- Building a JavaScript game from scratch really helped boost my confidence and cement my knowledge in an area I found very challenging during the first two weeks of the course 
- I felt a lot more comfortable with forEach loops and using multiple functions to achieve the functionality in the game, especially for getting the obstacles to move across the game.







