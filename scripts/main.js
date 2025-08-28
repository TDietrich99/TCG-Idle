import { ALL_CARDS } from "./card.js";
import { log } from "./debug.js";
import { init_game, update_game } from "./game.js";
import { player } from "./player.js";

init_game();
log(ALL_CARDS);

log(player);
log("======");
setInterval(update_game, 1000 / 30);