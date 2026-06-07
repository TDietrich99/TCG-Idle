import { bigNumber } from "./currency.js";
import { ONE } from "./currency.js";
class Game {

    constructor() {
        this.gold = new bigNumber(0,0);
    }

    // ---------- Actions ----------

    clickGold() {
        this.gold.add(ONE);
    }
    clickGold2() {
        this.gold.multiply(new bigNumber(2,0));
    }
    // ---------- Tick ----------

    tick(delta) {
        console.log('tick');
    }

    // ---------- Save ----------

    getSaveData() {
        return {
            gold:{m:this.gold.m,e:this.gold.e}
        };
    }
    loadSaveData(data) {
        if (!data) return;
        this.gold = new bigNumber(data.gold.m,data.gold.e);
    }
}

// globale Instanz
window.game = new Game();


// ---------- Game Loop ----------

let last = Date.now();

setInterval(() => {

    const now = Date.now();
    const delta = (now - last) / 1000;
    last = now;

    game.tick(delta);

}, 50);

// ---------- Save / Load ----------

function saveGame() {

    localStorage.setItem(
        "idleSave",
        JSON.stringify(game.getSaveData())
    );

}

function loadGame() {

    const data =
        JSON.parse(localStorage.getItem("idleSave"));

    game.loadSaveData(data);

}

loadGame();
setInterval(saveGame, 5000);