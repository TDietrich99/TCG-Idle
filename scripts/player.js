import { log } from "./debug.js";
import { Card } from "./card.js";
import { map_to_obj, obj_to_map } from "./helper.js";
import { update_collection } from "./ui.js";
class Player {
    constructor() {
        this.reset();
    }

    draw_card(amount = 1) {
        let cards = [];
        for (let a = 0; a < amount; a++) {
            let card = new Card();
            card.draw(this);
            this.opened_packs_amount++;
            cards.push(card);
        }
        for (let i = 0; i < cards.length; i++) {
            this.add_card(cards[i]);
        }
        update_collection();
    }
    add_card(c) {
        if (!this.owned_cards.has(c.id)) {
            this.owned_cards.set(c.id, new Map());
        }
        let owned_rarity_map = this.owned_cards.get(c.id);
        owned_rarity_map.set(c.print, (owned_rarity_map.get(c.print) || 0) + 1);

        this.owned_cards_obj = map_to_obj(this.owned_cards);
    }
    reset() {
        this.money = 0;
        this.opened_packs_amount = 0;
        this.owned_cards = new Map();
        this.owned_cards_obj = null;
        this.last_save = Date.now();
    }

    save() {
        log("Saved");
        this.last_save = Date.now();
        this.owned_cards_obj = map_to_obj(this.owned_cards);
        localStorage.setItem("idleSave", JSON.stringify(this));
    }

    load() {
        const data = JSON.parse(localStorage.getItem("idleSave"));
        if (data) Object.assign(this, data);
        this.owned_cards = obj_to_map(this.owned_cards_obj);
        update_collection();
    }

    delete() {
        this.reset();
        localStorage.removeItem("idleSave");
        update_collection();
    }
};

export let player = new Player();