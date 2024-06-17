"use strict";

const map = new Map("/images/background_tiles.png", 0, 0);
const hero = new GameObject("/images/dead_body.png", 5, 1);
const ham = new StaticGameObject("/images/ham.png", 17, 1);
const phone = new StaticGameObject("/images/phone.png", 17, 3);
map.generateMap();
hero.generateSprite();
ham.generateSprite();
phone.generateSprite();
//
hero.loadHealthBar(0, 0);
hero.loadSocialBar(0, 0);
checkForChanges();
startStatusBarTimers();

// beginGameLoop();
// hero.updateHungerStatus();
// hero.updateSocialStatus();
