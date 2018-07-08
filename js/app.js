//Superordinate class of all characters
class Character {
  constructor(x, y) {
    this.sprite = 'images/';
    this.x = x;
    this.y = y;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Enemies our player must avoid
class Enemy extends Character {
  constructor(x, y) {
    super();
    this.sprite += 'enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = (1 + getRandomInt(5) * 100);
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  // If the enemy runs off the board, they are reset and let loose again with randomized speed
  update(dt) {
    this.x += this.speed * dt;
    if (this.x > 550) {
      this.speed = (1 + getRandomInt(5)) * 100;
      this.x = -100;
    }
  }
}

//Our Player - Char Pink Girl
class Player extends Character {
  constructor(x, y) {
    super();
    this.sprite += 'char-pink-girl.png';
    this.x = x;
    this.y = y;
  }

  //this uses the keyUp event listener to move player objects around
  handleInput(allowedKeys) {
    switch (allowedKeys) {
      case 'left':
        if (this.x > 10 && isPlaying === true) {
          this.x -= 50.5;
        }
        break;
      case 'up':
        if (this.y > 10 && isPlaying === true) {
          this.y -= 50.5;
        }
        break;
      case 'right':
        if (this.x < 355 && isPlaying === true) {
          this.x += 50.5;
        }
        break;
      case 'down':
        if (this.y < 400 && isPlaying === true)
        this.y += 50.5;
        break;
    }
  }

  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.y === 0 && isPlaying == true) {
      setTimeout (function() {
        showModal();
        isPlaying = false;
      }, 200);
    }

  }

  // Reset player
  reset() {
    this.x = 202;
    this.y = 303;
  }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player(202, 303);
let allEnemies = [];
allEnemies.splice(0, 0, new Enemy(0, 62), new Enemy(0, 145), new Enemy(0, 228));
let isPlaying = true;

// This listens for key presses and sends the keys to your
// handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//function to open modal when player reaches water
function showModal() {
  document.querySelector('.dialog-overlay').style.display = 'block';
}

//function to hide modal, called when keep playing button is pressed
function closeModal() {
  document.querySelector('.dialog-overlay').style.display = 'none';
}

//listens for keep playing button and calls closeModal
let modal = document.querySelector('.dialog-overlay');

//listens to keep playing button and closes modal and when clicked
modal.addEventListener('click', function() {
  closeModal();
  isPlaying = true;
  player.reset();
  allEnemies.forEach(function(enemy) {
    enemy.x = -100;
    enemy.speed = (1 + getRandomInt(5) * 100);
  });
});

//random number generator to randomize enemy speed
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//checking to see it player is being ran over by enemies, if so, resetting player
function checkCollisions() {
  if (player.y === 202 && player.x >= (allEnemies[2].x - 20) && player.x <= (allEnemies[2].x + 75)) {
    player.reset();
  } else if ((player.y === 151.5 || player.y === 101) && player.x >= (allEnemies[1].x - 20) && player.x <= (allEnemies[1].x + 75)) {
      player.reset();
  } else if (player.y === 50.5 && player.x >= (allEnemies[0].x - 20) && player.x <= (allEnemies[0].x + 75)) {
      player.reset();
  }
}
