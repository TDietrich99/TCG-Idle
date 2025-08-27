import { init_game, update_game } from "./game.js";

init_game();
setInterval(update_game, 1000 / 30);