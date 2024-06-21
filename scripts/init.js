"use strict";

function loadAssets() {
  const assets = [
    "/images/gameBackgroundV2.png",
    "/images/dead_body.png",
    "/images/fridge.png",
    "/images/phone.png",
    "/images/bed.png",
    "/images/dressor.png",
  ];

  assets.forEach((imageSrc) => {
    const imageToLoad = new Image();
    imageToLoad.src = imageSrc;
  });
}

// Creating new objects
const map = new Map("/images/gameBackgroundV2.png", 5, 4);
const hero = new Player("/images/dead_body.png", 10, 6);
const fridge = new GameObject("/images/fridge.png", 8, 6);
gameObjectsArray.push(fridge);
const phone = new GameObject("/images/phone.png", 6, 6);
gameObjectsArray.push(phone);
const bed = new GameObject("/images/bed.png", 12, 6);
gameObjectsArray.push(bed);
const dressor = new GameObject("/images/dressor.png", 14, 6);
gameObjectsArray.push(dressor);

// Generating sprites on canvas
map.generateMap();
hero.generateSprite();
fridge.generateSprite();
phone.generateSprite();
bed.generateSprite();
dressor.generateSprite();
hero.loadHealthBar(0, 0);
hero.loadSocialBar(0, 0);

// Set interval that redraws status bars every 0.1 seconds
checkForChanges();
// Initiates status bar countdown
startStatusBarTimers();
