var cell = { 'width' : 101, 'length' : 83}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    var row = Math.round((this.y + 20) / cell.length);    
    var colRight = Math.round((this.x + 30) / cell.width);
    var colLeft = Math.round((this.x - 20) / cell.width);
    if ( row == player.row && (colRight == player.col || colLeft == player.col ))      
        player.reset(); 
    if ( colRight == 6)
        this.reset();    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    //this.x = getRandomInt(-cell.width*500,0);
    this.x = -cell.width; 
    this.y = getRandomInt(1, 3) * cell.length - 20; 
    this.speed = getRandomInt(20,100);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(col, row) {
    this.sprite = 'images/char-boy.png';
    this.col = col;
    this.row = row ; 
    this.shiftCol = 0;
    this.shiftRow = 0;
    this.initLocation = { 'col' : col, 'row' : row }
};

Player.prototype.update = function() {
    
    var newCol = this.col + this.shiftCol;
    var newRow = this.row + this.shiftRow;
    
    if (newCol < 5 && newCol >= 0)
        this.col = newCol;
    if (newRow < 6 && newRow > 0)
        this.row = newRow;
    if (newRow == 0)
        this.reset();
    this.shiftCol = 0;
    this.shiftRow = 0;
};

Player.prototype.reset = function() {
    this.col = this.initLocation.col;
    this.row = this.initLocation.row;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col * cell.width, this.row * cell.length - 11);
};

//prsdKey parameter is the pressed key
Player.prototype.handleInput = function(prsdKey) {
    this.shiftCol = 0;
    this.shiftRow = 0;

    switch (prsdKey) {
        case 'left':
            this.shiftCol = -1;            
            break;
        case 'up':            
            this.shiftRow = -1;
            break;
        case 'right':
            this.shiftCol = 1;            
            break;
        case 'down':            
            this.shiftRow = 1;
            break;
        default:
            break;
    }
};


function getRandomInt(min, max)
{ return Math.floor(Math.random() * (max - min + 1)) + min; }


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i = 0; i < 3; i++)
{
    allEnemies[i] = new Enemy();
}
var player = new Player(2,5);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
