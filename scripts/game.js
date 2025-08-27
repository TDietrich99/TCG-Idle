import { ALL_CARDS } from "./card.js";
import { log } from "./debug.js";
import { player } from "./player.js";
import { update_ui } from "./ui.js";

export function update_game() {
    if (Date.now() - player.last_save > 500000) {
        player.save();
    }
    update_ui();
};

export function init_game() {
    ALL_CARDS.load().then(() => {
        player.load();
        log("Game initialized");
    }).catch(err => {
        console.error("Fehler beim Laden der Karten:", err);
    });
}
