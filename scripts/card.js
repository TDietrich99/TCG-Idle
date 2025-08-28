import { log } from "./debug.js";

export class Card {
    constructor(data_json = null) {
        if (data_json !== null) {
            this.id = data_json.id;
            this.name = data_json.name;
            this.img = data_json.img || 'https://dummyimage.com/200/f/000000.png&text=' + this.id;
            this.rarity = RARITY.COMMON;
            this.print = PRINT.NORMAL;
            this.value = data_json.value;
        }
    }
    get_sell_value(print_override = null) {
        let multi = 1;
        if (print_override === null) {
            print_override = this.print;
        }
        for (let i = 0; i < this.rarity; i++) {
            multi *= 9;
        }
        for (let i = 0; i < print_override; i++) {
            multi *= 11;
        }
        return (this.value * multi).toFixed(2);
    }

    
}
const PRINT = Object.freeze({
    NORMAL: 0,
    HOLO: 1,
    GHOST: 2
});
const print_chances = [
    { print: PRINT.NORMAL, weight: 9000 },
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
        this.loaded = false;
        this.rarity_0 = [];
        this.rarity_1 = [];
        this.rarity_2 = [];
        this.rarity_3 = [];
        this.rarity_4 = [];
        this.card_index = new Map();
    }
    get_collection_by_rarity(rarity) {
        switch (rarity) {
            case 0:
                return this.rarity_0;
            case 1:
                return this.rarity_1;
            case 2:
                return this.rarity_2;
            case 3:
                return this.rarity_3;
            case 4:
                return this.rarity_4;
        }
    }
    draw_random_card(player) {
        let rarity = this.get_random_rarity(player);
        let print = this.get_random_print(player);
        let pool = this.get_collection_by_rarity(rarity);
        let rand = Math.random() * pool.length;
        let card = pool[Math.floor(rand)];
        card.print = print;
        return card;
    }
    get_card_by_id(id) {
        return this.card_index.get(id);
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
    async load() {
        if (this.loaded) {
            return;
        }
        const files = [
            "./assets/cards/rarity_0.json",
            "./assets/cards/rarity_1.json",
            "./assets/cards/rarity_2.json",
            "./assets/cards/rarity_3.json",
            "./assets/cards/rarity_4.json"
        ];
        const responses = await Promise.all(files.map(url => fetch(url)));

        // Fehler abfangen falls eine Response nicht ok ist
        responses.forEach((resp, i) => {
            if (!resp.ok) {
                throw new Error(`Fehler beim Laden von ${files[i]}`);
            }
        });
        const results = await Promise.all(responses.map(r => r.json()));
        for (let i = 0; i < results[0].length; i++) {
            let card = new Card(results[0][i]);
            card.rarity = 0;
            this.rarity_0.push(card);
        }
        for (let i = 0; i < results[1].length; i++) {
            let card = new Card(results[1][i]);
            card.rarity = 1;
            this.rarity_1.push(card);
        }
        for (let i = 0; i < results[2].length; i++) {
            let card = new Card(results[2][i]);
            card.rarity = 2;
            this.rarity_2.push(card);
        }
        for (let i = 0; i < results[3].length; i++) {
            let card = new Card(results[3][i]);
            card.rarity = 3;
            this.rarity_3.push(card);
        }
        for (let i = 0; i < results[4].length; i++) {
            let card = new Card(results[4][i]);
            card.rarity = 4;
            this.rarity_4.push(card);
        }

        [
            this.rarity_0,
            this.rarity_1,
            this.rarity_2,
            this.rarity_3,
            this.rarity_4,
        ].forEach(rar_arr => {
            rar_arr.forEach(c => {
                this.card_index.set(c.id, c);
            });
        });
        log("Cardsets loaded Successfully");
        this.loaded = true;
    }
}
export let ALL_CARDS = new FULL_COLLECTION();