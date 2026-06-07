
type SaveData = {
    player: PlayerSave;
}
type BigNumberSave = {
    m: number;
    e: number;
}
type PlayerSave = {
    money: BigNumberSave;
    dimensions: DimensionSave[];
}

type DimensionSave = {
    amount: BigNumberSave;
    scaling: number;
    production: BigNumberSave
    multi: BigNumberSave;
}