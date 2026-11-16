// Edit this file to add news and work-in-progress items. No other code changes needed.
// game: "battle-dice" | "pakjesfeest" | "all" (shows on every page)   kind: "milestone" | "update" | "news"
// status (WIP): "building" | "testing" | "planned"
// Optional nl: { title, text } is used on the Dutch game pages.

window.NEWS = [
  { game: "all", date: "2026-11-12", kind: "milestone", title: "Live on Google Play", text: "Pakjesfeest and Battle Dice Simulator are available to download.",
    nl: { title: "Live op Google Play", text: "Pakjesfeest en Battle Dice Simulator zijn te downloaden." } }
];

window.WIP = [
  // { game: "pakjesfeest", title: "New minigame", status: "building", note: "What you are working on.", nl: { title: "Nieuw spelletje", note: "Waar je aan werkt." } }
];

window.GAMES = {
  "battle-dice": { name: "Battle Dice Simulator", url: "games/battle-dice-simulator/" },
  "pakjesfeest": { name: "Pakjesfeest", url: "games/pakjesfeest/" }
};
