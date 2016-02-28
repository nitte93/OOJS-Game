var Xdir = 101;
var Ydir = 84;
var Canvasleft = 0;
var Canvasright = 400;
var Canvastop = 84;
var Canvasbottom = 400;


var Enemy = function(x, y){
	this.x = x;
	this.y = y;
	this.sprite = 'images/enemy-bug.png';

	var speeds = [60, 200, 250, 260, 300, 340, 350, 400];
	var randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];

	this.speed = randomSpeed;
}

Enemy.prototype.update = function(dt){
	  this.x += this.speed *dt;
	  if(this.x > Canvasright){
	  		this.x = Math.floor(Math.random() * -300)
	  }  
};

Enemy.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite) , this.x, this.y);
}

var allEnemies = [];

var enemy1 = new Enemy(0, 62);
var enemy2 = new Enemy(0, 62);
var enemy3 = new Enemy(0, 144);
var enemy4 = new Enemy(0, 144);
var enemy5 = new Enemy(0, 230);
var enemy6 = new Enemy(0, 230);

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);
allEnemies.push(enemy6);

var Player = function(x, y){
	this.x = x;
	this.y  =y;

	this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt){

}

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite),  this.x, this.y);
}

Player.prototype.update = function(){
	for(var e = 0; e < allEnemies.length; e++){
		if(player.x <= (allEnemies[e].x + 70) && (player.x + 50) >= allEnemies[e].x && player.y <= (allEnemies[e].y + 70 ) && allEnemies[e].y <= (player.y+60)){
				player.reset();
		}
	}
};

Player.prototype.handleInput = function(key){
	switch(key){
		case 'left':
			if(this.x > Canvasleft){
				this.x -= Xdir;
			}
			break;
		case 'right':
			if(this.x < Canvasright){
				this.x += Xdir;
			}
			break;
		case 'up':
			if(this.y > Canvastop){
				this.y -= Ydir;
			}else{
				player.resetOnWin();
			}
			break;
		case 'down':
			if(this.y < Canvasbottom){
				this.y += Ydir;
			}
			break;
		default:
			return;
	}
};

var  score =0;
Player.prototype.resetOnWin = function(){
	this.x = 200; 
	this.y = 400;
	score++;
	document.getElementById('score').innerHTML = 'Score['+ score+']';
}

Player.prototype.reset = function(){
	this.x = 200; 
	this.y = 400;
	score--;
	document.getElementById('score').innerHTML = 'Score['+ score+']';
}

var player = new Player(200, 400);
document.addEventListener('keyup', function(e){
	var allowedkeys = {
			37 : 'left',
			38 : 'up',
			39 : 'right',
			40 : 'down'
		};

		player.handleInput(allowedkeys[e.keyCode]);
})
