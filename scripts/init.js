"use strict";

// Creating new objects
const map = new Map("/images/gameBackground.png", 2, 2);
const hero = new Player("/images/dead_body.png", 10, 6);
const fridge = new GameObject("/images/fridge.png", 6, 5);
gameObjectsArray.push(fridge);
const phone = new GameObject("/images/phone.png", 4, 5);
gameObjectsArray.push(phone);
const bed = new GameObject("/images/bed.png", 16, 5);
gameObjectsArray.push(bed);
const dressor = new GameObject("/images/dressor.png", 18, 5);
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
