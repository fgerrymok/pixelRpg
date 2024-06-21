"use strict";

// Constants
const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");
const staticCanvas = document.getElementById("static-canvas");
const staticCtx = staticCanvas.getContext("2d");
const gameObjectsArray = [];
const imagesArray = [];

// Classes

// Class for map.
class Map {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  updateMapPosition(keyDown) {
    if (keyDown === "w") {
      this.y += 1;
    } else if (keyDown === "s") {
      this.y -= 1;
    } else if (keyDown === "a") {
      this.x += 1;
    } else if (keyDown === "d") {
      this.x -= 1;
    }
  }
}

// Class for players.
class Player {
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

  turnInPlace(keyDown) {
    // ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    if (keyDown === "w") {
      this.cutX = 0;
      this.cutY = 32;
    } else if (keyDown === "a") {
      this.cutX = 32;
      this.cutY = 0;
    } else if (keyDown === "s") {
      this.cutX = 32;
      this.cutY = 32;
    } else if (keyDown === "d") {
      this.cutX = 0;
      this.cutY = 0;
    }
  }
}

// Class for game objects.
class GameObject {
  constructor(imageSrc, x, y) {
    this.imageSrc = imageSrc;
    this.x = x;
    this.y = y;
  }

  generateImage() {
    const objectImg = new Image();
    objectImg.src = this.imageSrc;
  }

  updatePosition(keyDown) {
    if (keyDown === "w") {
      this.y += 1;
    } else if (keyDown === "s") {
      this.y -= 1;
    } else if (keyDown === "a") {
      this.x += 1;
    } else if (keyDown === "d") {
      this.x -= 1;
    }
  }
}

// Event Listeners

document.addEventListener("keydown", function (event) {
  const keyDown = event.key.toLowerCase();
  // if keyDown is wsad then move map, and all objects
  if (
    keyDown === "w" ||
    keyDown === "s" ||
    keyDown === "a" ||
    keyDown === "d"
  ) {
    let spaceOccupied = [];
    gameObjectsArray.forEach((object) => {
      if (checkForCollisions(object, keyDown) === true) {
        spaceOccupied.push(true);
      } else if (checkForCollisions(object, keyDown) === false) {
        spaceOccupied.push(false);
      }
    });
    if (checkForWalls(keyDown) === true) {
      spaceOccupied.push(true);
    } else if (checkForWalls(keyDown) === false) {
      spaceOccupied.push(false);
    }
    if (spaceOccupied.includes(true)) {
      gameObjectsArray.forEach((object) => {});
      hero.turnInPlace(keyDown);
    } else if (spaceOccupied.includes(false)) {
      map.updateMapPosition(keyDown);
      gameObjectsArray.forEach((object) => {
        object.updatePosition(keyDown);
      });
      hero.turnInPlace(keyDown);
    }
  }
});

function checkForCollisions(object, keyDown) {
  if (
    (hero.x == object.x - 1 && hero.y == object.y && keyDown == "d") ||
    (hero.x == object.x + 1 && hero.y == object.y && keyDown == "a") ||
    (hero.x == object.x && hero.y == object.y - 1 && keyDown == "s") ||
    (hero.x == object.x && hero.y == object.y + 1 && keyDown == "w")
  ) {
    return true;
  } else {
    return false;
  }
}

function checkForWalls(keyDown) {
  if (
    (map.y === 4 && keyDown === "w") ||
    (map.y === 1 && keyDown === "s") ||
    (map.x === 10 && keyDown === "a") ||
    (map.x === 0 && keyDown === "d")
  ) {
    return true;
  } else {
    return false;
  }
}

// Listens for 'spacebar' and 'enter' to see if the character is beside either the food item, or the social item.
document.addEventListener("keydown", (event) => {
  const keyDown = event.key;
  if (keyDown === " " || keyDown === "Enter") {
    const besideAndFacingFood = checkIfBesideAndFacingObject(0);
    const besideAndFacingPhone = checkIfBesideAndFacingObject(1);
    if (besideAndFacingFood === true) {
      eatFood();
    } else if (besideAndFacingPhone === true) {
      makePhoneCall();
    }
  }
});

// Functions

// Runs a setInterval that updates statusBars every 1/10 of a second.
function loadGameAssets() {
  setInterval(() => {
    // clear canvases
    staticCtx.clearRect(0, 0, staticCanvas.width, staticCanvas.height);
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // update hunger status bar
    if (hero.hunger === 5) {
      staticCtx.drawImage(hungerBar, 0, 0, 80, 16, 3, 12, 80, 16);
    } else if (hero.hunger === 4) {
      staticCtx.drawImage(hungerBar, 80, 0, 80, 16, 3, 12, 80, 16);
    } else if (hero.hunger === 3) {
      staticCtx.drawImage(hungerBar, 160, 0, 80, 16, 3, 12, 80, 16);
    } else if (hero.hunger === 2) {
      staticCtx.drawImage(hungerBar, 0, 16, 80, 16, 3, 12, 80, 16);
    } else if (hero.hunger === 1) {
      staticCtx.drawImage(hungerBar, 80, 16, 80, 16, 3, 12, 80, 16);
    } else if (hero.hunger === 0) {
      staticCtx.drawImage(hungerBar, 160, 16, 80, 16, 3, 12, 80, 16);
    }

    // updates social status bar
    if (hero.social === 5) {
      staticCtx.drawImage(socialBar, 0, 0, 80, 16, 3, 23, 80, 16);
    } else if (hero.social === 4) {
      staticCtx.drawImage(socialBar, 80, 0, 80, 16, 3, 23, 80, 16);
    } else if (hero.social === 3) {
      staticCtx.drawImage(socialBar, 160, 0, 80, 16, 3, 23, 80, 16);
    } else if (hero.social === 2) {
      staticCtx.drawImage(socialBar, 0, 16, 80, 16, 3, 23, 80, 16);
    } else if (hero.social === 1) {
      staticCtx.drawImage(socialBar, 80, 16, 80, 16, 3, 23, 80, 16);
    } else if (hero.social === 0) {
      staticCtx.drawImage(socialBar, 160, 16, 80, 16, 3, 23, 80, 16);
    }

    // update health bar (needs more code)
    staticCtx.drawImage(healthBar, 0, 0, 80, 16, 3, 1, 80, 16);

    // draw map
    ctx.drawImage(gameMap, map.x * 16, map.y * 16);

    // draw game objects
    gameObjectsArray.forEach((object) => {
      ctx.drawImage(object.image, object.x * 16, object.y * 16);
    });

    // draw hero
    ctx.drawImage(
      hero.image,
      hero.cutX,
      hero.cutY,
      32,
      32,
      hero.x * 16,
      hero.y * 16,
      32,
      32
    );
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

// Replenishes hunger status
function eatFood() {
  console.log(`Hunger: ${hero.hunger}`);
  if (hero.hunger < 5) {
    hero.hunger += 1;
  }
}

// Replenishes social status
function makePhoneCall() {
  console.log(`Social: ${hero.social}`);
  if (hero.social < 5) {
    hero.social += 1;
  }
}

// Checks to see if the character is directly beside AND facing a game object. Accepts a number value to determine which object we would like to check for.
function checkIfBesideAndFacingObject(index) {
  if (
    (hero.x == gameObjectsArray[index].x - 1 &&
      hero.y == gameObjectsArray[index].y &&
      hero.cutX == 0 &&
      hero.cutY == 0) ||
    (hero.x == gameObjectsArray[index].x + 1 &&
      hero.y == gameObjectsArray[index].y &&
      hero.cutX == 32 &&
      hero.cutY == 0) ||
    (hero.x == gameObjectsArray[index].x &&
      hero.y == gameObjectsArray[index].y - 1 &&
      hero.cutX == 32 &&
      hero.cutY == 32) ||
    (hero.x == gameObjectsArray[index].x &&
      hero.y == gameObjectsArray[index].y + 1 &&
      hero.cutX == 0 &&
      hero.cutY == 32)
  )
    return true;
}
