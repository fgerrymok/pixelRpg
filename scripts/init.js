"use strict";

// Creating new objects
const map = new Map("/images/background_tiles.png", 0, 0);
const hero = new Player("/images/dead_body.png", 10, 6);
const ham = new GameObject("/images/fridge.png", 6, 10);
gameObjectsArray.push(ham);
const phone = new GameObject("/images/phone.png", 17, 6);
gameObjectsArray.push(phone);

// Generating sprites on canvas
map.generateMap();
hero.generateSprite();
ham.generateSprite();
phone.generateSprite();
hero.loadHealthBar(0, 0);
hero.loadSocialBar(0, 0);

// Set interval that redraws status bars every 0.1 seconds
checkForChanges();
// Initiates status bar countdown
startStatusBarTimers();
