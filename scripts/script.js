"use strict";

// Constants
const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");

// Classes
class Map {
  constructor(mapSrc, x, y) {
    this.mapSrc = mapSrc;
    this.x = x;
    this.y = y;
  }

  generateMap() {
    const gameMap = new Image();
    gameMap.src = this.mapSrc;
    gameMap.onload = () => {
      ctx.drawImage(gameMap, this.x, this.y);
    };
  }
}
class GameObject {
  constructor(imageSrc, x, y) {
    this.imageSrc = imageSrc;
    this.x = x;
    this.y = y;
    this.hunger = 5;
  }

  generateSprite(cutX, cutY) {
    // create the hero image
    const objectImg = new Image();
    objectImg.src = this.imageSrc;
    const x = this.x * 16 - 7;
    const y = this.y * 16 - 16;
    const spriteWidth = 32;
    const spriteHeight = 32;
    // write the sprite sheet onto the ctx
    objectImg.onload = () => {
      ctx.drawImage(
        objectImg,
        cutX,
        cutY,
        spriteWidth,
        spriteHeight,
        x,
        y,
        spriteWidth,
        spriteHeight
      );
    };
  }

  updateCoordinates(keyPress) {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    // this method needs to update this.x and this.y when wsad keys are pressed.
    if (keyPress === "w") {
      console.log("Move up");
      this.y -= 1;
      map.generateMap();
      hero.generateSprite(0, 32);
    } else if (keyPress === "a") {
      console.log("Move left");
      this.x -= 1;
      map.generateMap();
      hero.generateSprite(32, 0);
    } else if (keyPress === "s") {
      console.log("Move down");
      this.y += 1;
      map.generateMap();
      hero.generateSprite(32, 32);
    } else if (keyPress === "d") {
      console.log("Move right");
      this.x += 1;
      map.generateMap();
      hero.generateSprite(0, 0);
    } else {
      map.generateMap();
      hero.generateSprite(0, 0);
    }
  }

  updateHungerStatus() {
    console.log("this is working");
    console.log(this.hunger);
    const self = this;
    setInterval(function () {
      self.hunger -= 1;
      console.log(self.hunger);
    }, 5000);
  }
}

// Event Listeners

document.addEventListener("keypress", function (event) {
  const keyPress = event.key;
  hero.updateCoordinates(keyPress);
});

// Functions

// Need to create a loop where the hero sprite is constantly being refreshed on the canvas.
// Each loop should be able to update for a new x and y coordinate.
// Generate sprite is a method of game object
// The constructor of game object is where the x and y values are stored. These values are passed in, but we can update them and pass in the new updated coordinates into the sprite.

// Let's break down the steps:
// Figure out how to run a loop. Every iteration of the loop, update the x and y coordinates using:
// hero.updateCoordinates();
// Once the coordinates are updated, run the sprite generation method and wipe out the old sprite from the canvas
// hero.generateSprite();

// Step 1 is to figure out how to run a loop that keeps generating the sprite in the same location

// Let's create a function that begins the game loop

function beginGameLoop() {
  function step() {
    // ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    console.log("running");
    // hero.updateCoordinates();

    // The step function runs a requestAnimationFrame which calls the step function
    // This is different than step calling itself, rather step is calling step again when a new frame starts
    // requestAnimationFrame provides a gap for other processing to happen so that our computer doesn't crash
    requestAnimationFrame(() => {
      step();
    });
  }
  // The step function is called once when beginGameLoop is called
  step();
}
