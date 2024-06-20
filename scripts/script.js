"use strict";

// Constants
const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");
const staticCanvas = document.getElementById("static-canvas");
const staticCtx = staticCanvas.getContext("2d");
const gameObjectsArray = [];

// Classes

// Class for map.
class Map {
  constructor(mapSrc, x, y) {
    this.mapSrc = mapSrc;
    this.x = x;
    this.y = y;
  }

  generateMap() {
    const gameMap = new Image();
    gameMap.src = this.mapSrc;
    const x = this.x * 16;
    const y = this.y * 16 - 16;
    gameMap.onload = () => {
      ctx.drawImage(gameMap, x, y);
      console.log(x, y);
    };
  }

  updateMapPosition(keyDown) {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    if (keyDown === "w") {
      this.y += 1;
      this.generateMap();
    } else if (keyDown === "s") {
      this.y -= 1;
      this.generateMap();
    } else if (keyDown === "a") {
      this.x += 1;
      this.generateMap();
    } else if (keyDown === "d") {
      this.x -= 1;
      this.generateMap();
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

  generateSprite() {
    // create the hero image
    const objectImg = new Image();
    objectImg.src = this.imageSrc;
    const x = this.x * 16;
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

// Class for game objects.
class GameObject {
  constructor(imageSrc, x, y) {
    this.imageSrc = imageSrc;
    this.x = x;
    this.y = y;
  }

  updatePosition(keyDown) {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    if (keyDown === "w") {
      this.y += 1;
      this.generateSprite();
    } else if (keyDown === "s") {
      this.y -= 1;
      this.generateSprite();
    } else if (keyDown === "a") {
      this.x += 1;
      this.generateSprite();
    } else if (keyDown === "d") {
      this.x -= 1;
      this.generateSprite();
    }
  }

  generateSprite() {
    const objectImg = new Image();
    objectImg.src = this.imageSrc;
    const x = this.x * 16;
    const y = this.y * 16 - 16;
    objectImg.onload = () => {
      ctx.drawImage(objectImg, 0, 0, 32, 32, x, y, 32, 32);
    };
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
      map.generateMap();
      gameObjectsArray.forEach((object) => {
        object.generateSprite();
      });
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
    (map.y === 3 && keyDown === "w") ||
    (map.y === -2 && keyDown === "s") ||
    (map.x === 10 && keyDown === "a") ||
    (map.x === -7 && keyDown === "d")
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

// Replenishes hunger status
function eatFood() {
  console.log("you ate food");
  hero.hunger += 1;
}

// Replenishes social status
function makePhoneCall() {
  console.log("you made a phone call");
  hero.social += 1;
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
