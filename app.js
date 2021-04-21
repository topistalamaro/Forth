// Enemies our player must avoid
var Enemy = function(x, y, speed, sprite) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
    this.x = this.enemyPosX();
    this.y = this.enemyPosY();
    this.speed = 200;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    if (this.x > 500) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.enemyPosX = function() {
    var posX = [100, 200, 300, 400];
    return posX[Math.floor(Math.random() * posX.length)];
};

Enemy.prototype.enemyPosY = function() {
    var posY = [100, 150, 200];
    return posY[Math.floor(Math.random() * posY.length)];
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, sprite) {
    this.x = 200;
    this.y = 500;
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.update = function() {
    this.checkCollisions(enemy);
    if (this.y === 0) {
        this.reset();
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    switch(allowedKeys){
        case "left":
            if (this.x > 0)
                this.x = this.x - 100;
            break;
        case "right":
            if (this.x < 400)
                this.x = this.x + 100;
            break;
        case "up":
            if (this.y > 0)
                this.y = this.y - 100;
            break;
        case "down":
            if (this.y > 50 && this.y < 400)
                this.y = this.y + 100;
            break;
    }
};

Player.prototype.checkCollisions = function() {
     allEnemies.forEach(function(enemy) {
    if (this.x >= enemy.x &&
        this.x <= enemy.x + 100 &&
        this.y >= enemy.y &&
        this.y <= enemy.y + 100) {
        this.reset();
        }
    }, this);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy = new Enemy();
var player = new Player();
var allEnemies = [];

(function() {
    for (var i = 0; i < 4; i++) {
        enemy = new Enemy();
        allEnemies.push(enemy);
  }
}());

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
