"use strict";

const map = new Map("/images/background_tiles.png", 0, 0);
const hero = new GameObject("/images/dead_body.png", 1, 1);
map.generateMap();
hero.generateSprite(0, 0);
beginGameLoop();
