"use strict";

// Constants
const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");
const staticCanvas = document.getElementById("static-canvas");
const staticCtx = staticCanvas.getContext("2d");
const gameObjectsArray = [];

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
      staticCtx.drawImage(gameMap, this.x, this.y);
    };
  }
}

class StaticGameObject {
  constructor(imageSrc, x, y) {
    this.imageSrc = imageSrc;
    this.x = x;
    this.y = y;
  }

  generateSprite() {
    const objectImg = new Image();
    objectImg.src = this.imageSrc;
    const x = this.x * 16 - 7;
    const y = this.y * 16 - 16;
    objectImg.onload = () => {
      staticCtx.drawImage(objectImg, 0, 0, 32, 32, x, y, 32, 32);
    };
  }
}
class GameObject {
  constructor(imageSrc, x, y) {
    this.imageSrc = imageSrc;
    this.x = x;
    this.y = y;
    this.health = 5;
    this.hunger = 5;
    this.social = 5;
    this.cutX = 0;
    this.cutY = 0;
  }

  generateSprite() {
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
        this.cutX,
        this.cutY,
        spriteWidth,
        spriteHeight,
        x,
        y,
        spriteWidth,
        spriteHeight
      );
    };
  }

  updateCoordinates(keyDown) {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    // this method needs to update this.x and this.y when wsad keys are pressed.
    if (keyDown === "w" && this.y === 1) {
      this.cutX = 0;
      this.cutY = 32;
      this.generateSprite();
    } else if (keyDown === "w") {
      this.y -= 1;
      this.cutX = 0;
      this.cutY = 32;
      this.generateSprite();
    } else if (keyDown === "a" && this.x === 0) {
      this.cutX = 32;
      this.cutY = 0;
      this.generateSprite();
    } else if (keyDown === "a") {
      this.x -= 1;
      this.cutX = 32;
      this.cutY = 0;
      this.generateSprite();
    } else if (keyDown === "s" && this.y === 11) {
      this.cutX = 32;
      this.cutY = 32;
      this.generateSprite();
    } else if (keyDown === "s") {
      this.y += 1;
      this.cutX = 32;
      this.cutY = 32;
      this.generateSprite();
    } else if (keyDown === "d" && this.x === 21) {
      this.cutX = 0;
      this.cutY = 0;
      this.generateSprite();
    } else if (keyDown === "d") {
      this.x += 1;
      this.cutX = 0;
      this.cutY = 0;
      this.generateSprite();
    }
  }

  turnInPlace(keyDown) {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    if (keyDown === "w") {
      this.cutX = 0;
      this.cutY = 32;
      this.generateSprite();
    } else if (keyDown === "a") {
      this.cutX = 32;
      this.cutY = 0;
      this.generateSprite();
    } else if (keyDown === "s") {
      this.cutX = 32;
      this.cutY = 32;
      this.generateSprite();
    } else if (keyDown === "d") {
      this.cutX = 0;
      this.cutY = 0;
      this.generateSprite();
    }
  }

  // On load, hunger needs to decrease every 5 seconds. (this is a set inteveral)
  // If player eats, the players hunger levels (this.hunger) increases by 1.

  // Every time this method is called, it will read the current the hunger property of the object and update the hunger sprite accordingly.
  loadHungerBar() {
    const hungerBar = new Image();
    hungerBar.src = "/images/hunger_status.png";
    const cutX = 0;
    const cutY = 0;
    hungerBar.onload = () => {
      if (this.hunger === 5) {
        staticCtx.drawImage(hungerBar, cutX, cutY, 80, 16, 3, 12, 80, 16);
      } else if (this.hunger === 4) {
        staticCtx.drawImage(hungerBar, cutX + 80, cutY, 80, 16, 3, 12, 80, 16);
      } else if (this.hunger === 3) {
        staticCtx.drawImage(hungerBar, cutX + 160, cutY, 80, 16, 3, 12, 80, 16);
      } else if (this.hunger === 2) {
        staticCtx.drawImage(hungerBar, cutX, cutY + 16, 80, 16, 3, 12, 80, 16);
      } else if (this.hunger === 1) {
        staticCtx.drawImage(
          hungerBar,
          cutX + 80,
          cutY + 16,
          80,
          16,
          3,
          12,
          80,
          16
        );
      } else if (this.hunger === 0) {
        staticCtx.drawImage(
          hungerBar,
          cutX + 160,
          cutY + 16,
          80,
          16,
          3,
          12,
          80,
          16
        );
      }
    };
  }

  loadSocialBar() {
    const socialBar = new Image();
    socialBar.src = "/images/social_status.png";
    const cutX = 0;
    const cutY = 0;
    socialBar.onload = () => {
      if (this.social === 5) {
        staticCtx.drawImage(socialBar, cutX, cutY, 80, 16, 3, 23, 80, 16);
      } else if (this.social === 4) {
        staticCtx.drawImage(socialBar, cutX + 80, cutY, 80, 16, 3, 23, 80, 16);
      } else if (this.social === 3) {
        staticCtx.drawImage(socialBar, cutX + 160, cutY, 80, 16, 3, 23, 80, 16);
      } else if (this.social === 2) {
        staticCtx.drawImage(socialBar, cutX, cutY + 16, 80, 16, 3, 23, 80, 16);
      } else if (this.social === 1) {
        staticCtx.drawImage(
          socialBar,
          cutX + 80,
          cutY + 16,
          80,
          16,
          3,
          23,
          80,
          16
        );
      } else if (this.social === 0) {
        staticCtx.drawImage(
          socialBar,
          cutX + 160,
          cutY + 16,
          80,
          16,
          3,
          23,
          80,
          16
        );
      }
    };
  }

  loadHealthBar(cutX, cutY) {
    const healthBar = new Image();
    healthBar.src = "/images/health_status.png";
    healthBar.onload = () => {
      staticCtx.drawImage(healthBar, cutX, cutY, 80, 16, 3, 1, 80, 16);
    };
  }
}

// Event Listeners

// Listens w, s, a, d keys to move the character.
document.addEventListener("keydown", function (event) {
  const keyDown = event.key.toLowerCase();
  let moveCharacter = [];
  gameObjectsArray.forEach((object) => {
    const movement = checkForObstacles(object, keyDown);
    if (movement === "move") {
      moveCharacter.push(true);
    } else if (movement === "don't move") {
      console.log("no move");
      moveCharacter.push(false);
    }
  });

  if (moveCharacter.includes(false)) {
    hero.turnInPlace(keyDown);
  } else if (
    keyDown === "w" ||
    keyDown === "a" ||
    keyDown === "s" ||
    keyDown === "d"
  ) {
    hero.updateCoordinates(keyDown);
  }
});

// Listens for clicks on the 'ham' button to simulate eating food (increases health status).
ham.addEventListener("click", () => {
  console.log("you ate food");
  hero.hunger += 1;
});

// Listens for clicks on the 'phone' button to simulate making a phone call (increases social status).
phone.addEventListener("click", () => {
  console.log("you made a phone call");
  hero.social += 1;
});

// Listens for keydown "enter" or "spacebar" if:
//

// Functions

// Runs a setInterval on the loadHungerBar method of hero every 0.1 seconds to check for changes in social and hunger status.
function checkForChanges() {
  setInterval(() => {
    hero.loadHungerBar();
  }, 100);
  setInterval(() => {
    hero.loadSocialBar();
  }, 100);
}

// Starts the count down that decrease food levels.
function startStatusBarTimers() {
  // Hunger Status Timer
  setInterval(() => {
    if (hero.hunger > 0) {
      hero.hunger -= 1;
    }
  }, 3000);

  // Social Status Timer
  setInterval(() => {
    if (hero.social > 0) {
      hero.social -= 1;
    }
  }, 5000);
}

// Checks to see if there is an object beside the hero AND if the hero is trying to move in the direction of the object. Returns a value indicating whether or not we should update the coordinates of the hero.
function checkForObstacles(object, keyDown) {
  if (
    (hero.x == object.x - 1 && hero.y == object.y && keyDown == "d") ||
    (hero.x == object.x + 1 && hero.y == object.y && keyDown == "a") ||
    (hero.x == object.x && hero.y == object.y - 1 && keyDown == "s") ||
    (hero.x == object.x && hero.y == object.y + 1 && keyDown == "w")
  ) {
    return "don't move";
  } else {
    return "move";
  }
}

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

// function beginGameLoop() {
//   function step() {
//     // ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
//     console.log("running");
//     // hero.updateCoordinates();

//     // The step function runs a requestAnimationFrame which calls the step function
//     // This is different than step calling itself, rather step is calling step again when a new frame starts
//     // requestAnimationFrame provides a gap for other processing to happen so that our computer doesn't crash
//     requestAnimationFrame(() => {
//       step();
//     });
//   }
//   // The step function is called once when beginGameLoop is called
//   step();
// }
