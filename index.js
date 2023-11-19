/** @type {HTMLCanvasElement}*/

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

let CANVAS_WIDTH = (canvas.width = 800);
let CANVAS_HEIGHT = (canvas.height = 800);

let gameFrame = 0;
let wigle = 5;
let range = 2.5;

let numberOfEnemies = 100;
let enemiesArray = [];

const enemyImage = new Image();

let enemyImageWidth = 293;
let enemyImageHeight = 250;

enemyImage.src =
  "https://github.com/Florin12er/javascript-game-3/blob/main/assets/enemy1.png?raw=true";
let EnemyImage = enemyImage;
class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = EnemyImage;
    this.width = 100;
    this.height = 100;
    this.spriteWidth = enemyImageWidth;
    this.spriteHeight = enemyImageHeight;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }
  update() {
    this.x += Math.random() * wigle - range;
    this.y += Math.random() * wigle - range;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      EnemyImage,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.draw();
    enemy.update();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
