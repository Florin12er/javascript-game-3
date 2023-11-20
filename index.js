/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const canvas3 = document.getElementById("canvas3");
const canvas4 = document.getElementById("canvas4");

const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");
const ctx3 = canvas3.getContext("2d");
const ctx4 = canvas4.getContext("2d");

let gameFrame = 1;
let wiggle = 5;
let range = 2.5;

let numberOfEnemies = 200;
let enemiesArray = [];
let enemiesArray2 = [];
let enemiesArray3 = [];
let enemiesArray4 = [];

let CANVAS_WIDTH = (canvas.width = 1200);
let CANVAS_HEIGHT = (canvas.height = 1400);

let CANVAS_WIDTH2 = (canvas2.width = 1200);
let CANVAS_HEIGHT2 = (canvas2.height = 1400);

let CANVAS_WIDTH3 = (canvas3.width = 1200);
let CANVAS_HEIGHT3 = (canvas3.height = 1400);

let CANVAS_WIDTH4 = (canvas4.width = 1200);
let CANVAS_HEIGHT4 = (canvas4.height = 1400);

const enemyImage = new Image();
const enemyImage2 = new Image();
const enemyImage3 = new Image();
const enemyImage4 = new Image();

let enemyImageWidths = [293, 266, 218, 213];
let enemyImageHeights = [250, 188, 177, 213];
enemyImage.src =
  "https://github.com/Florin12er/javascript-game-3/blob/main/assets/enemy1.png?raw=true";
enemyImage2.src =
  "https://github.com/Florin12er/javascript-game-3/blob/main/assets/enemy2.png?raw=true";
enemyImage3.src =
  "https://github.com/Florin12er/javascript-game-3/blob/main/assets/enemy3.png?raw=true";
enemyImage4.src =
  "https://github.com/Florin12er/javascript-game-3/blob/main/assets/enemy4.png?raw=true";

class Enemy {
  constructor(ctx, canvasWidth, canvasHeight, image, width, height) {
    this.ctx = ctx;
    this.image = image;
    this.width = width;
    this.height = height;
    this.spriteWidth = width;
    this.spriteHeight = height;
    this.x = Math.random() * (canvasWidth - this.width);
    this.y = Math.random() * (canvasHeight - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 0.3;
    this.angleVelocity = Math.random() * 0.6 + 0.1;
    this.positionAngle = Math.random() * 7;
    this.playerPosition = canvas.width / 2 - this.width / 2;
    this.playerPositionHeight = canvas.height / 2 - this.height / 2;
    this.curveWidth = canvas.width / 2;
    this.curveHeight = canvas.height / 2;
    this.newX = Math.random() * canvas.width;
    this.newY = Math.random() * canvas.height;
    this.interval = Math.floor(Math.random() * 200 + 50);
  }
  updateFirst() {
    this.x += Math.random() * wiggle - range;
    this.y += Math.random() * wiggle - range;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  updateSecond() {
    this.x -= this.flapSpeed;
    this.y += this.positionAngle * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) this.x = canvas.width;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  updateThird() {
    this.x =
      this.curveWidth * Math.sin((this.angle * Math.PI) / 180) +
      this.playerPosition;
    this.angle += this.angleVelocity;
    this.y =
      this.curveHeight * Math.sin((this.angle * Math.PI) / 720) +
      this.playerPositionHeight;
    this.angle += this.angleVelocity;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  updateForth() {
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (canvas.width - this.width);
      this.newY = Math.random() * (canvas.height - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 90;
    this.y -= dy / 90;
    if (this.x + this.width < 0) this.x = canvas.width;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    this.ctx.drawImage(
      this.image,
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
  enemiesArray.push(
    new Enemy(
      ctx,
      CANVAS_WIDTH,
      CANVAS_HEIGHT,
      enemyImage,
      enemyImageWidths[0],
      enemyImageHeights[0],
    ),
  );
  enemiesArray2.push(
    new Enemy(
      ctx2,
      CANVAS_WIDTH2,
      CANVAS_HEIGHT2,
      enemyImage2,
      enemyImageWidths[1],
      enemyImageHeights[1],
    ),
  );
  enemiesArray3.push(
    new Enemy(
      ctx3,
      CANVAS_WIDTH3,
      CANVAS_HEIGHT3,
      enemyImage3,
      enemyImageWidths[2],
      enemyImageHeights[2],
    ),
  );
  enemiesArray4.push(
    new Enemy(
      ctx4,
      CANVAS_WIDTH4,
      CANVAS_HEIGHT4,
      enemyImage4,
      enemyImageWidths[3],
      enemyImageHeights[3],
    ),
  );
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.draw();
    enemy.updateFirst();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();

function animate2() {
  ctx2.clearRect(0, 0, CANVAS_WIDTH2, CANVAS_HEIGHT2);
  enemiesArray2.forEach((enemy) => {
    enemy.draw();
    enemy.updateSecond();
  });
  gameFrame++;
  requestAnimationFrame(animate2);
}

animate2();

function animate3() {
  ctx3.clearRect(0, 0, CANVAS_WIDTH3, CANVAS_HEIGHT3);
  enemiesArray3.forEach((enemy) => {
    enemy.draw();
    enemy.updateThird();
  });
  gameFrame++;
  requestAnimationFrame(animate3);
}

animate3();

function animate4() {
  ctx4.clearRect(0, 0, CANVAS_WIDTH4, CANVAS_HEIGHT4);
  enemiesArray4.forEach((enemy) => {
    enemy.draw();
    enemy.updateForth();
  });
  gameFrame++;
  requestAnimationFrame(animate4);
}

animate4();
