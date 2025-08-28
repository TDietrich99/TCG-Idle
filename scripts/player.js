import { log } from "./debug.js";
import { ALL_CARDS, Card } from "./card.js";
import { map_to_obj, obj_to_map } from "./helper.js";
import { update_collection } from "./ui.js";
class Player {
    constructor() {
        this.reset();
    }
    sell_all() {
        log("Sell all");
        log(this.owned_cards.keys());
        for (let id of this.owned_cards.keys()) {
            log(id);
            for (let print of this.owned_cards.get(id).keys()) {
                this.sell_card(id, print, -1);
            }
        }
    }
    sell_card(card_id, print, bulk = 1) {
        if (this.owned_cards.has(card_id) && this.owned_cards.get(card_id).has(print)) {
            let amount = this.owned_cards.get(card_id).get(print);
            if (bulk === -1) {
                bulk = amount;
            }
            log("amount" + amount);
            let card = ALL_CARDS.get_card_by_id(card_id);
            card.print = print;
            if (amount > bulk) {
                this.owned_cards.get(card_id).set(print, amount - bulk);
                this.money += bulk * card.get_sell_value();
            } else {
                log("deleted " + print);
                this.owned_cards.get(card_id).delete(print);
                this.money += amount * card.get_sell_value();
            }
            if (this.owned_cards.get(card_id).size === 0) {
                this.owned_cards.delete(card_id);
            }
            log("Sold " + card_id + " " + print);
            log(this.money);
        } else {
            log("WTF");
        }
    }
    draw_card(amount = 10) {
        if (this.money >= 10) {
            this.money -= 10;
        } else {
            return;
        }
        let cards = [];
        for (let a = 0; a < amount; a++) {
            let card = ALL_CARDS.draw_random_card(player);
            this.opened_packs_amount++;
            cards.push(card);
        }
        for (let i = 0; i < cards.length; i++) {
            this.add_card(cards[i]);
        }
        log(cards);
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
        this.money = 10;
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