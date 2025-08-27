import { log } from "./debug.js";

export class Card {
    constructor(card_id = null) {
        if (card_id !== null) {
            this.id = card_id;
            let card_json = this.get_card_by_id();
            this.set_card_from_json_card(card_json);
        }
    }
    draw(player) {
        this.rarity = this.get_random_rarity();
        this.print = this.get_random_print();
        let card_json = this.get_random_card_by_rarity();
        this.set_card_from_json_card(card_json);
    }
    set_card_from_json_card(card_json) {
        this.id = card_json.id;
        this.name = card_json.name;
        this.rarity = card_json.rarity;
        this.img = "https://dummyimage.com/200/f/0.png&text=" + this.id;
        if (card_json.img != null) {
            this.img = card_json.img;
        }
    }
    get_random_rarity(player) {
        const total_weight = rarity_chances.reduce((sum, r) => sum + r.weight, 0);
        let rand = Math.random() * total_weight;
        let rarest = 0;
        for (let r of rarity_chances) {
            if (rand <= r.weight) {
                rarest = r.rarity;
            }
        }
        return rarest;
    }

    get_random_print(player) {
        const total_weight = print_chances.reduce((sum, r) => sum + r.weight, 0);
        let rand = Math.random() * total_weight;
        let rarest = 0;
        for (let r of print_chances) {
            if (rand <= r.weight) {
                rarest = r.print;
            }
        }
        return rarest;
    }

    get_random_card_by_rarity() {
        let pool = [];
        for (let i = 0; i < ALL_CARDS.content.length; i++) {
            let card = ALL_CARDS.content[i];
            if (ALL_CARDS.content[i].rarity === this.rarity) {
                pool.push(card);
            }
        }
        const random_index = Math.floor(Math.random() * pool.length);
        return pool[random_index];
    }
    get_card_by_id() {
        let ret = ALL_CARDS.content.find(c => c.id === this.id);
        return ret;
    }
}
const PRINT = Object.freeze({
    NORMAL: 0,
    HOLO: 1,
    GHOST: 2
});
const print_chances = [
    { print: PRINT.NORMAL, weight: 90000 },
    { print: PRINT.HOLO, weight: 1000 },
    { print: PRINT.GHOST, weight: 1 }
];
const RARITY = Object.freeze({
    COMMON: 0,
    RARE: 1,
    VERY_RARE: 2,
    EPIC: 3,
    LEGENDARY: 4
});
const rarity_chances = [
    { rarity: RARITY.COMMON, weight: 9000 },
    { rarity: RARITY.RARE, weight: 900 },
    { rarity: RARITY.VERY_RARE, weight: 90 },
    { rarity: RARITY.EPIC, weight: 9 },
    { rarity: RARITY.LEGENDARY, weight: 1 }
];


export function get_rarity_name(value) {
    return Object.keys(RARITY).find(key => RARITY[key] === value);
}

export function get_print_name(value) {
    return Object.keys(PRINT).find(key => PRINT[key] === value);
}

class FULL_COLLECTION {
    constructor() {
        this.reset();
    }
    reset() {
        this.content = [];
    }
    async load() {
        if (this.content !== null && this.content !== undefined && this.content.length != 0) {
            return this.content;
        }
        const resp = await fetch("./assets/cards/define.json");
        if (!resp.ok) {
            throw new Error("Karten können nicht geladen werden");
        }
        let ret = await resp.json();
        log("Successfully loaded Cards");
        if (ret) Object.assign(this.content, ret);
    }
}
export let ALL_CARDS = new FULL_COLLECTION();