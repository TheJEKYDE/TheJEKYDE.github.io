// Edit this file to add news and work-in-progress items. No other code changes needed.
// game: "battle-dice" | "pakjesfeest" | "asteroid-miner" | "all" (shows on every page)   kind: "milestone" | "update" | "news"
// status (WIP): "building" | "testing" | "planned"
// Optional nl: { title, text } is used on the Dutch game pages.

window.NEWS = [
  { game: "all", date: "2026-11-12", kind: "milestone", title: "Live on Google Play", text: "Pakjesfeest and Battle Dice Simulator are available to download.",
    nl: { title: "Live op Google Play", text: "Pakjesfeest en Battle Dice Simulator zijn te downloaden." } }
];

window.WIP = [
  { game: "asteroid-miner", title: "Core game", status: "building", note: "Tapping, drones, upgrades and research are being built.",
    nl: { title: "Kern van het spel", note: "Tikken, drones, upgrades en onderzoek worden gebouwd." } },
  { game: "asteroid-miner", title: "Bosses and more galaxies", status: "building", note: "Boss fights and new galaxies with their own rules.",
    nl: { title: "Eindbazen en meer sterrenstelsels", note: "Eindbaasgevechten en nieuwe sterrenstelsels met eigen regels." } },
  { game: "asteroid-miner", title: "Android release", status: "planned", note: "First on Android.",
    nl: { title: "Android-release", note: "Eerst op Android." } }
];

window.GAMES = {
  "battle-dice": { name: "Battle Dice Simulator", url: "games/battle-dice-simulator/" },
  "pakjesfeest": { name: "Pakjesfeest", url: "games/pakjesfeest/" },
  "asteroid-miner": { name: "Asteroid Miner Clicker", url: "games/asteroid-miner-clicker/" }
};
