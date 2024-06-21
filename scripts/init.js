"use strict";

// Load all images
const hungerBar = new Image();
hungerBar.src = "/images/hunger_status.png";

const socialBar = new Image();
socialBar.src = "/images/social_status.png";

const healthBar = new Image();
healthBar.src = "/images/health_status.png";

const gameMap = new Image();
gameMap.src = "/images/gameBackgroundV2.png";

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

// Map
const map = new Map(5, 4);

// Player
const hero = new Player("/images/dead_body.png", 10, 6);
hero.image = new Image();
hero.image.src = hero.imageSrc;

// Creating game objects and pushing to an array
const fridge = new GameObject("/images/fridge.png", 8, 6);
gameObjectsArray.push(fridge);
const phone = new GameObject("/images/phone.png", 6, 6);
gameObjectsArray.push(phone);
const bed = new GameObject("/images/bed.png", 12, 6);
gameObjectsArray.push(bed);
const dressor = new GameObject("/images/dressor.png", 14, 6);
gameObjectsArray.push(dressor);

// Creating a new Image for each object
gameObjectsArray.forEach((object) => {
  object.image = new Image();
  object.image.src = object.imageSrc;
});

// Set interval that redraws status bars every 0.1 seconds
loadGameAssets();
// Initiates status bar countdown
startStatusBarTimers();
