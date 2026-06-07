import { bigNumber, ZERO } from "./currency";
import { dimension } from "./dimension";

export class player{
    money: bigNumber;
    dimensions: dimension[];
    constructor(){
        this.money = new bigNumber();
        this.dimensions = [];
        for(let i = 0; i < 8 ; i++){
            this.dimensions[i] = new dimension();
        }
    }
    getSaveData():PlayerSave{
        return {
            money: this.money.getSaveData(),
            dimensions: this.dimensions.map(d=>d.getSaveData())
        };
    }
    loadSaveData(data:PlayerSave){
        this.money.loadSaveData(data.money);
        for(let i = 0; i < data.dimensions.length; i++){
            this.dimensions[i].loadSaveData(data.dimensions[i]);
        }
    }
}