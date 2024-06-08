"use strict";

// Constants
const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");
// we create a new image, to be inserted into the canvas through a separate function
const gameBackground = new Image();
gameBackground.src = "/images/background.png";

// Classes

class GameObject {
  constructor(imageSrc, x, y) {
    this.imageSrc = imageSrc;
    this.x = x;
    this.y = y;
  }

  generateSprite() {
    // create the hero image
    const objectImg = new Image();
    objectImg.src = this.imageSrc;
    const x = this.x * 16 - 8;
    const y = this.y * 16 - 18;
    const spriteWidth = 32;
    const spriteHeight = 32;
    // write the sprite sheet onto the ctx
    objectImg.onload = () => {
      ctx.drawImage(
        objectImg,
        0,
        0,
        spriteWidth,
        spriteHeight,
        x,
        y,
        spriteWidth,
        spriteHeight
      );
    };
  }
}

class GamePerson extends GameObject {
  constructor(imageSrc, x, y) {
    super(imageSrc, x, y);
  }

  move(keyPress) {
    // console.log(`You pressed ${keyPress}`);
    if (keyPress === "w") {
      console.log("Move up");
      // y - 1
    }
    if (keyPress === "a") {
      console.log("Move left");
      // x - 1
    }
    if (keyPress === "s") {
      console.log("Move down");
      // y + 1
    }
    if (keyPress === "d") {
      console.log("Move right");
      // x + 1
    }
  }
}

// Event Listeners

document.addEventListener("keypress", function (event) {
  const keyPress = event.key;
  hero.move(keyPress);
});

// Functions
function generateNewWorld() {
  // when the image loads, we draw the image onto the canvas
  gameBackground.onload = () => {
    ctx.drawImage(gameBackground, 0, 0);
  };
}

generateNewWorld();
const hero = new GamePerson("/images/hero_sprite_sheet.png", 1, 1);
hero.generateSprite();
