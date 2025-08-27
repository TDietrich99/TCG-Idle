import { player } from "./player.js";
import { create_collection_div } from "./helper.js";
import { log } from "./debug.js";

export function update_ui() {
	document.getElementById("total_packs_opened").textContent = Math.floor(player.opened_packs_amount);
	
}
export function update_collection(){
	let collection = document.getElementById("collection");
	collection.innerHTML = "";
	for (let key of player.owned_cards.keys()) {
		create_collection_div(collection, key);
	}
}

document.getElementById("open_pack").addEventListener("click", () => {
	player.draw_card();
	update_ui();
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

document.addEventListener("keydown", (event) => {
	if (event.code === "Space") {
		event.preventDefault(); // verhindert z. B. Scrollen der Seite
		log(player);
	}
});