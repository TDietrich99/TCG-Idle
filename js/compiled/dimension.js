import { bigNumber } from "./currency";
export class dimension {
    amount;
    scaling;
    production;
    constructor() {
        this.amount = new bigNumber();
        this.production = new bigNumber(1, -1);
        this.scaling = 10;
    }
    getSaveData() {
        return {
            amount: this.amount.getSaveData(),
            production: this.production.getSaveData(),
            scaling: this.scaling
        };
    }
    loadSaveData(data) {
        this.amount.loadSaveData(data.amount);
        this.production.loadSaveData(data.production);
        this.scaling = data.scaling;
    }
    getCost() {
        return new bigNumber(5, 2);
    }
    buy(amount) {
        let cost = this.getCost();
        this.amount.add(amount);
    }
}
//# sourceMappingURL=dimension.js.map