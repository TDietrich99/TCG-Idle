import { bigNumber, ZERO } from "./currency";

export class dimension{
    amount: bigNumber;
    scaling: number;
    production: bigNumber;
    multi: bigNumber;

    constructor(){
        this.amount = new bigNumber();
        this.production = new bigNumber(1,-1);
        this.scaling = 10;
        this.multi = new bigNumber(1,-2);
    }

    getSaveData():DimensionSave{
        return{
            amount: this.amount.getSaveData(),
            production: this.production.getSaveData(),
            scaling: this.scaling,
            multi: this.multi.getSaveData() 
        }
    }
    loadSaveData(data:DimensionSave){
        this.amount.loadSaveData(data.amount);
        this.production.loadSaveData(data.production);
        this.scaling = data.scaling;
        this.multi.loadSaveData(data.multi);
    }
    getCost():bigNumber{
        return this.amount;
    }
    buy(amount:number){
        let cost = this.getCost();
        this.amount.add(amount);
    }
}