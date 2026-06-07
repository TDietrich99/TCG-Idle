import { bigNumber } from "./currency";
import { dimension } from "./dimension";
export class player {
    money;
    dimensions;
    constructor() {
        this.money = new bigNumber();
        this.dimensions = [];
        for (let i = 0; i < 8; i++) {
            this.dimensions[i] = new dimension();
        }
    }
    getSaveData() {
        return {
            money: this.money.getSaveData(),
            dimensions: this.dimensions.map(d => d.getSaveData())
        };
    }
    loadSaveData(data) {
        this.money.loadSaveData(data.money);
        for (let i = 0; i < data.dimensions.length; i++) {
            this.dimensions[i].loadSaveData(data.dimensions[i]);
        }
    }
}
//# sourceMappingURL=player.js.map