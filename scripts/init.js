"use strict";

const map = new Map("/images/background_tiles.png", 0, 0);
const hero = new GameObject("/images/dead_body.png", 1, 2);
map.generateMap();
hero.generateSprite();
hero.loadStatusBars(0, 0);
// beginGameLoop();
hero.updateHungerStatus();
