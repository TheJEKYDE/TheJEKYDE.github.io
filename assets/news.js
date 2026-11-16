// Edit this file to add news and work-in-progress items. No other code changes needed.
// game: "battle-dice" | "pakjesfeest"   kind: "milestone" | "update" | "news"
// status (WIP): "building" | "testing" | "planned"
// NOTE: entries below are SAMPLE text - replace with real ones.

window.NEWS = [
  { game: "pakjesfeest", date: "2026-11-12", kind: "milestone", title: "Live on Google Play", text: "Pakjesfeest is available to download." },
  { game: "pakjesfeest", date: "2026-11-16", kind: "news", title: "Sample news item", text: "Replace this with your own update, for example a new level or a bug fix." },
  { game: "battle-dice", date: "2026-11-16", kind: "update", title: "Sample update", text: "Replace this with the changes in your latest release." }
];

window.WIP = [
  { game: "pakjesfeest", title: "Sample: new minigame", status: "building", note: "Replace with what you are working on." },
  { game: "pakjesfeest", title: "Sample: extra voice lines", status: "planned", note: "Replace with your plans." },
  { game: "battle-dice", title: "Sample: new feature", status: "testing", note: "Replace with what you are working on." }
];

window.GAMES = {
  "battle-dice": { name: "Battle Dice Simulator", url: "games/battle-dice-simulator/" },
  "pakjesfeest": { name: "Pakjesfeest", url: "games/pakjesfeest/" }
};
