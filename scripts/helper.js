import { log } from "./debug.js";
import { ALL_CARDS, Card, get_print_name, get_rarity_name } from "./card.js";
import { update_collection } from "./ui.js";
import { player } from "./player.js";

export function obj_to_map(obj) {
    if (obj === null) {
        return new Map();
    }
    return new Map(
        Object.entries(obj).map(([k, v]) =>
            [Number(k), (typeof v === "object" ? obj_to_map(v) : v)]
        )
    );
}

export function map_to_obj(map) {
    if (map.size === 0) {
        return null;
    }
    return Object.fromEntries(
        Array.from(map, ([k, v]) =>
            [k, v instanceof Map ? map_to_obj(v) : v]
        )
    );
}

export function create_collection_div(wrapper, card_id) {
    let card_data = player.owned_cards.get(card_id);
    let card = ALL_CARDS.get_card_by_id(card_id);
    // Outer div
    let outer_div = document.createElement("div");
    outer_div.classList = "card";
    // Title
    let title_div = document.createElement("div");
    title_div.textContent = card.name;

    // Image
    let img_div = document.createElement("div");
    let img_element = document.createElement("img");
    img_element.src = card.img;
    img_div.appendChild(img_element);

    // Zusatzinfos
    let info_div = document.createElement("div");
    info_div.classList = "card_info";
    let info_div_rarity_content = document.createElement("span");
    info_div_rarity_content.textContent = "Seltenheit: " + get_rarity_name(card.rarity);
    info_div.appendChild(info_div_rarity_content);
    for (let print of [...card_data.keys()].sort((a, b) => a - b)) {
        // Verkaufen
        let sell_button = document.createElement("button");
        sell_button.textContent = "Sell";
        sell_button.addEventListener('click', () => {
            log("KLICJ");
            player.sell_card(card_id, print);
            update_collection();
        });
        let info_div_text_content = document.createElement("span");
        
        info_div_text_content.textContent += get_print_name(print);
        info_div_text_content.textContent += ": " + card_data.get(print);
        info_div_text_content.textContent += " Stück (" + ALL_CARDS.get_card_by_id(card_id).get_sell_value(print).replace('.', ',') + "€)";
        info_div_text_content.appendChild(sell_button);
        info_div.appendChild(info_div_text_content);
    }
    // Struktur aufbauen
    outer_div.appendChild(title_div);
    outer_div.appendChild(img_div);
    outer_div.appendChild(info_div);

    // Und in wrapper einfügen
    wrapper.appendChild(outer_div);
}