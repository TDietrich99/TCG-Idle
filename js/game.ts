import { bigNumber, ONE } from "./currency";
import { player } from "./player";

class Game {
    player:  player;
    constructor() {
        this.player = new player();
    }

    // ---------- Actions ----------

    clickGold() {
        this.player.money.add(ONE);
    }
    // ---------- Tick ----------

    tick(delta:number) {
        for(let i = 0; i < this.player.dimensions.length - 1; i++){
            let amountToAdd = this.player.dimensions[i+1].amount.getvalue();
            amountToAdd.multiply(this.player.dimensions[i+1].multi);
            this.player.dimensions[i].amount.add(amountToAdd);
        }
        let amountToAdd = this.player.dimensions[0].amount.getvalue();

        amountToAdd.multiply(this.player.dimensions[0].multi);
        this.player.money.add(amountToAdd);
    }

    // ---------- Save ----------

    getSaveData():SaveData {
        return {
            player: this.player.getSaveData()
        }
    }
    loadSaveData(data:SaveData) {
        if (!data) return;
        console.log(data);
        this.player.loadSaveData(data.player);
    }
    deleteGame(){
        console.log('Harter Reset');
        localStorage.removeItem("idleSave");

        location.reload();
    }
}

// globale Instanz
 export const game = new Game();


// ---------- Game Loop ----------

let last = Date.now();

setInterval(() => {

    const now = Date.now();
    const delta = (now - last) / 1000;
    last = now;

    game.tick(delta);

}, 30);

// ---------- Save / Load ----------

function saveGame() {
    console.log('Game Saved');
    localStorage.setItem(
        "idleSave",
        JSON.stringify(game.getSaveData())
    );

}
function loadGame() {
    let jsondata = localStorage.getItem("idleSave");
    if(jsondata === null){
        return;
    }
    const data = JSON.parse(jsondata);

    game.loadSaveData(data);

}

loadGame();
setInterval(saveGame, 5000);