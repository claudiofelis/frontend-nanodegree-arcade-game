
var GameObject = function () {
    // The base for all Objects in the game
    this.x = 0
    this.y = 0
}
// Draw the enemy on the screen, required method for game
GameObject.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function (velocity, lane) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100 - (Math.random() * 500)
    this.y = 60 + (lane * 85)
    this.velocity = velocity;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype = Object.create(GameObject.prototype)

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 605) { // If the enemy no longer apear in the screen
        this.respawn() // Make the enemy reapear
        return
    }
    this.x = this.x + (dt * this.velocity)
};

Enemy.prototype.respawn = function () {
    // This method is used to make the enemy reapear after he leave the stage.
    this.x = -100 - (Math.random() * 500) // Adding a random delay to the apearing of the enemy
    this.velocity = 300 - (Math.random() * 100) // Adding a random velocity to the enemy
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.x = 200;
    this.y = 400;

    this.sprite = 'images/char-boy.png';
}
Player.prototype = Object.create(GameObject.prototype)

Player.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x;
    this.y = this.y;
};
Player.prototype.handleInput = function (key) {
    // Method used to move the player with arrow keys, this method also define the bounderies of the player.
    if (key == 'up') {
        this.y -= 85
        if (this.y < 0) {
            this.respawn(true)
        }
    }
    if (key == 'down') {
        if (this.y + 85 > 480) {
            return
        }
        this.y += 85
    }
    if (key == 'left') {
        if (this.x - 100 < 0) {
            return
        }
        this.x -= 100
    }
    if (key == 'right') {
        if (this.x + 100 > 400) {
            return
        }
        this.x += 100
    }
}
Player.prototype.respawn = function (isVictory) {
    // Method used to reset the player, and show alerts with the game result.
    this.y = 400
    this.x = 200
    if (isVictory) {
        alert('Great! You Won!')
    } else {
        alert('Boooh! You Lose!')
    }
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [ 
    new Enemy(300 - (Math.random() * 100), 0), // (Random velocity, line wich the enemy will appear)
    new Enemy(300 - (Math.random() * 100), 1), 
    new Enemy(300 - (Math.random() * 100), 2), 
    new Enemy(300 - (Math.random() * 100), 0), 
    new Enemy(300 - (Math.random() * 100), 1), 
    new Enemy(300 - (Math.random() * 100), 2)]

// Place the player object in a variable called player
var player = new Player()


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
