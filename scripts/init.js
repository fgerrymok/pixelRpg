"use strict";

const startScreen = document.getElementById("start-screen");

// Load all images
const hungerBar = new Image();
hungerBar.src = "/images/hunger_status.png";

const socialBar = new Image();
socialBar.src = "/images/social_status.png";

const healthBar = new Image();
healthBar.src = "/images/health_status.png";

const overallProgressBar = new Image();
overallProgressBar.src = "/images/progress-bar.png";

const workProgressBar = new Image();
workProgressBar.src = "/images/mini-progress.png";

const moneyCounter = new Image();
moneyCounter.src = "/images/money.png";

// Player
const hero = new Player("/images/dead_body.png", 10, 5);
hero.image = new Image();
hero.image.src = hero.imageSrc;

// Map
const map = new Map(5, 2);
const gameMap = new Image();
gameMap.src = "/images/gameBackgroundV3.png";

// Creating game objects and pushing to an array
const fridge = new GameObject("/images/fridge.png", 8, 4);
gameObjectsArray.push(fridge);
const phone = new GameObject("/images/phone.png", 6, 4);
gameObjectsArray.push(phone);
const bed = new GameObject("/images/bed.png", 12, 4);
gameObjectsArray.push(bed);
const dressor = new GameObject("/images/dressor.png", 14, 4);
gameObjectsArray.push(dressor);
const computer = new GameObject("/images/desktop-off.png", 10, 4);
gameObjectsArray.push(computer);

// Creating a new Image for each object
gameObjectsArray.forEach((object) => {
  object.image = new Image();
  object.image.src = object.imageSrc;
});

function startGame() {
  startScreen.style.display = "none";
  // Set interval that redraws status bars every 0.1 seconds
  loadGameAssets();
  // Initiates status bar countdown
  startStatusBarTimers();
  // Initiates a set interval to check for whether or not to start reducing the player's health
  checkHealth();
  // Checks the win / loss conditions
  checkPlayerState();
}

// function loadAssets() {
//   const assets = [
//     "/images/gameBackgroundV2.png",
//     "/images/dead_body.png",
//     "/images/fridge.png",
//     "/images/phone.png",
//     "/images/bed.png",
//     "/images/dressor.png",
//   ];

//   assets.forEach((imageSrc) => {
//     const imageToLoad = new Image();
//     imageToLoad.src = imageSrc;
//   });
// }
