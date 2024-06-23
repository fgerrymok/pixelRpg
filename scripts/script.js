"use strict";

// Constants
const gameCanvas = document.getElementById("game-canvas");
const ctx = gameCanvas.getContext("2d");
const staticCanvas = document.getElementById("static-canvas");
const staticCtx = staticCanvas.getContext("2d");
const gameObjectsArray = [];
const imagesArray = [];
const losingScreen = document.getElementById("losing-screen");
const winningScreen = document.getElementById("winning-screen");
const moneyOutput = document.getElementById("money-output");
const startGameBtn = document.getElementById("start-game-button");

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
    this.cutX = 0;
    this.cutY = 0;
    this.health = 5;
    this.hunger = 5;
    this.social = 5;
    this.overallProgress = 0;
    this.money = 0;
    this.workProgress = 0;
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

startGameBtn.addEventListener("click", () => {
  startGame();
});

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
    (map.y === 3 && keyDown === "w") ||
    (map.y === 0 && keyDown === "s") ||
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
    const besideAndFacingComputer = checkIfBesideAndFacingObject(4);
    if (besideAndFacingFood === true) {
      eatFood();
    } else if (besideAndFacingPhone === true) {
      makePhoneCall();
    } else if (besideAndFacingComputer === true && hero.workProgress === 0) {
      work();
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

    // load money counter
    staticCtx.drawImage(moneyCounter, 0, 0, 48, 16, 296, 8, 48, 16);

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

    // updates health status bar
    if (hero.health === 5) {
      staticCtx.drawImage(healthBar, 0, 0, 80, 16, 3, 1, 80, 16);
    } else if (hero.health === 4) {
      staticCtx.drawImage(healthBar, 80, 0, 80, 16, 3, 1, 80, 16);
    } else if (hero.health === 3) {
      staticCtx.drawImage(healthBar, 160, 0, 80, 16, 3, 1, 80, 16);
    } else if (hero.health === 2) {
      staticCtx.drawImage(healthBar, 0, 16, 80, 16, 3, 1, 80, 16);
    } else if (hero.health === 1) {
      staticCtx.drawImage(healthBar, 80, 16, 80, 16, 3, 1, 80, 16);
    } else if (hero.health === 0) {
      staticCtx.drawImage(healthBar, 160, 16, 80, 16, 3, 1, 80, 16);
    }

    // Update overall progress bar
    if (hero.overallProgress === 0) {
      staticCtx.drawImage(overallProgressBar, 0, 0, 234, 32, 65, 0, 234, 32);
    } else if (hero.overallProgress === 1) {
      staticCtx.drawImage(overallProgressBar, 0, 32, 234, 32, 65, 0, 234, 32);
    } else if (hero.overallProgress === 2) {
      staticCtx.drawImage(overallProgressBar, 0, 64, 234, 32, 65, 0, 234, 32);
    } else if (hero.overallProgress === 3) {
      staticCtx.drawImage(overallProgressBar, 0, 96, 234, 32, 65, 0, 234, 32);
    } else if (hero.overallProgress === 4) {
      staticCtx.drawImage(overallProgressBar, 0, 128, 234, 32, 65, 0, 234, 32);
    } else if (hero.overallProgress === 5) {
      staticCtx.drawImage(overallProgressBar, 234, 0, 234, 32, 65, 0, 234, 32);
    } else if (hero.overallProgress === 6) {
      staticCtx.drawImage(overallProgressBar, 234, 32, 234, 32, 65, 0, 234, 32);
    } else if (hero.overallProgress === 7) {
      staticCtx.drawImage(overallProgressBar, 234, 64, 234, 32, 65, 0, 234, 32);
    } else if (hero.overallProgress === 8) {
      staticCtx.drawImage(overallProgressBar, 234, 96, 234, 32, 65, 0, 234, 32);
    } else if (hero.overallProgress === 9) {
      staticCtx.drawImage(
        overallProgressBar,
        234,
        128,
        234,
        32,
        65,
        0,
        234,
        32
      );
    }

    // loads work progress bar
    if (hero.workProgress > 0 && hero.workProgress <= 1) {
      staticCtx.drawImage(
        workProgressBar,
        0,
        0,
        32,
        16,
        10 * 16,
        4.5 * 16,
        32,
        16
      );
    } else if (hero.workProgress > 1 && hero.workProgress <= 2) {
      staticCtx.drawImage(
        workProgressBar,
        32,
        0,
        32,
        16,
        10 * 16,
        4.5 * 16,
        32,
        16
      );
    } else if (hero.workProgress > 2 && hero.workProgress <= 3) {
      staticCtx.drawImage(
        workProgressBar,
        64,
        0,
        32,
        16,
        10 * 16,
        4.5 * 16,
        32,
        16
      );
    } else if (hero.workProgress > 3 && hero.workProgress <= 4) {
      staticCtx.drawImage(
        workProgressBar,
        0,
        16,
        32,
        16,
        10 * 16,
        4.5 * 16,
        32,
        16
      );
    } else if (hero.workProgress > 4 && hero.workProgress <= 5) {
      staticCtx.drawImage(
        workProgressBar,
        32,
        16,
        32,
        16,
        10 * 16,
        4.5 * 16,
        32,
        16
      );
    } else if (hero.workProgress > 5 && hero.workProgress <= 6) {
      staticCtx.drawImage(
        workProgressBar,
        64,
        16,
        32,
        16,
        10 * 16,
        4.5 * 16,
        32,
        16
      );
    }

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
  }, 7000);

  // Social Status Timer
  setInterval(() => {
    if (hero.social > 0) {
      hero.social -= 1;
    }
  }, 4000);
}

// Replenishes hunger status
function eatFood() {
  if (hero.hunger < 5 && hero.money >= 10) {
    hero.hunger += 1;
    hero.money -= 10;
    moneyOutput.innerText = `$${hero.money}`;
  }
}

// Replenishes social status
function makePhoneCall() {
  if (hero.social < 5) {
    hero.social += 1;
  }
}

// Increases money
function work() {
  const workProgressBarHandler = setInterval(() => {
    const besideAndFacingComputer = checkIfBesideAndFacingObject(4);
    if (besideAndFacingComputer === true) {
      hero.workProgress += 0.1;
    } else {
      clearInterval(workProgressBarHandler);
      clearTimeout(workTimeoutHandler);
      hero.workProgress = 0;
    }
    console.log(hero.workProgress);
  }, 100);
  const workTimeoutHandler = setTimeout(() => {
    hero.money += 15;
    hero.overallProgress += 1;
    moneyOutput.innerText = `$${hero.money}`;
    clearInterval(workProgressBarHandler);
    hero.workProgress = 0;
  }, 5300);
}

// Checks to see if the character is directly beside AND facing a game object. Accepts an integer value to determine which object we would like to check for.
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

// Recursive function that starts a setInterval to check if hunger or social are at zero. If so, another setInterval is started to reduce hunger, but only if hunger or social remain at zero. The function is called again within itself if player eats or makes a call.
function checkHealth() {
  const checkHealthHandler = setInterval(() => {
    if (hero.hunger === 0 || hero.social === 0) {
      clearInterval(checkHealthHandler);
      const decreaseHealthHandler = setInterval(() => {
        if ((hero.hunger === 0 || hero.social === 0) && hero.health > 0) {
          hero.health -= 1;
        } else {
          clearInterval(decreaseHealthHandler);
          checkHealth();
        }
      }, 2000);
    }
  }, 100);
}

function checkPlayerState() {
  setInterval(() => {
    if (hero.health === 0) {
      losingScreen.style.display = "block";
    }
  });
  setInterval(() => {
    if (hero.overallProgress === 9) {
      winningScreen.style.display = "block";
    }
  });
}
