import { player } from "./player.js";
import { create_collection_div } from "./helper.js";
import { log } from "./debug.js";

export function update_ui() {
	document.getElementById("total_packs_opened").textContent = Math.floor(player.opened_packs_amount);
	document.getElementById("total_money").textContent = player.money.toFixed(2) + "€";
}
export function update_collection() {
	let collection = document.getElementById("collection");
	collection.innerHTML = "";
	if (!UI_INFO.collection_is_open) {
		log("nope");
		log(UI_INFO.collection_is_open);
		return;
	}
	log("jup");
	log(UI_INFO.collection_is_open);
	for (let key of [...player.owned_cards.keys()].sort((a, b) => a - b)) {
		create_collection_div(collection, key);
	}
}
document.getElementById("sell_all").addEventListener("click", () => {
	player.sell_all();
	update_collection();
});
document.getElementById("open_pack").addEventListener("click", () => {
	player.draw_card();
});

document.getElementById("save").addEventListener("click", () => {
	player.save();
});

document.getElementById("load").addEventListener("click", () => {
	player.load();
});

document.getElementById("delete").addEventListener("click", () => {
	player.delete();
});

document.getElementById("toggle_collection").addEventListener("click", () => {
	UI_INFO.toggle_collection();
});

document.addEventListener("keydown", (event) => {
	if (event.code === "Space") {
		event.preventDefault(); // verhindert z. B. Scrollen der Seite
		log(player);
	}
});

document.addEventListener("keydown", (event) => {
	if (event.code === "Enter") {
		event.preventDefault();
		player.draw_card();
	}
});

class UI_Info {
	constructor() {
		this.collection_is_open = false;
	}
	toggle_collection() {
		if (this.collection_is_open) {
			this.collection_is_open = false;
		} else {
			this.collection_is_open = true;
        }
		update_collection();
    }
}
export let UI_INFO = new UI_Info();