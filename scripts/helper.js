import { log } from "./debug.js";
import { Card, get_print_name, get_rarity_name } from "./card.js";
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
    let card = new Card(card_id);
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
    info_div.innerHTML = "Seltenheit: " + get_rarity_name(card.rarity);
    for (let key of [...card_data.keys()].sort((a, b) => a - b)) {
        info_div.innerHTML += "<br>";
        info_div.innerHTML += "Print " + get_print_name(key);
        info_div.innerHTML += ": " + card_data.get(key);
        info_div.innerHTML += " Stück";
    }
    // Struktur aufbauen
    outer_div.appendChild(title_div);
    outer_div.appendChild(img_div);
    outer_div.appendChild(info_div);

    // Und in wrapper einfügen
    wrapper.appendChild(outer_div);
}