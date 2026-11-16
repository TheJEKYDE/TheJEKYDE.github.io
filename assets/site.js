// Renders news + work-in-progress from news.js. Works on the home page and on game pages.
(function () {
  var root = document.body.getAttribute("data-root") || "";
  var game = document.body.getAttribute("data-game");
  var nl = document.documentElement.lang === "nl";
  var fmt = new Intl.DateTimeFormat(nl ? "nl-NL" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  var label = nl ? { building: "In ontwikkeling", testing: "Wordt getest", planned: "Gepland" } : { building: "In development", testing: "Testing", planned: "Planned" };
  function t(o, k) { return nl && o.nl && o.nl[k] ? o.nl[k] : o[k]; }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  var feed = document.getElementById("news-feed");
  if (feed) {
    var limit = parseInt(feed.getAttribute("data-limit") || "0", 10);
    var items = (window.NEWS || []).filter(function (n) { return !game || n.game === game || n.game === "all"; })
      .sort(function (a, b) { return b.date.localeCompare(a.date); });
    if (limit) items = items.slice(0, limit);
    if (!items.length) feed.replaceWith(el("p", "empty", nl ? "Nog niets te melden." : "Nothing here yet. Check back soon."));
    items.forEach(function (n) {
      var li = el("li", n.kind === "milestone" ? "milestone" : "");
      var meta = el("div", "meta");
      meta.appendChild(el("time", "", fmt.format(new Date(n.date))));
      if (!game && n.game !== "all" && window.GAMES[n.game]) {
        var a = el("a", "from", window.GAMES[n.game].name);
        a.href = root + window.GAMES[n.game].url;
        meta.appendChild(a);
      }
      li.appendChild(meta);
      li.appendChild(el("h3", "", t(n, "title")));
      li.appendChild(el("p", "", t(n, "text")));
      feed.appendChild(li);
    });
  }

  var wip = document.getElementById("wip");
  if (wip) {
    var w = (window.WIP || []).filter(function (x) { return x.game === game; });
    if (!w.length) wip.replaceWith(el("p", "empty", nl ? "Op dit moment is er niets in ontwikkeling." : "Nothing in development right now."));
    w.forEach(function (x) {
      var c = el("div", "wip-card");
      c.appendChild(el("span", "chip " + x.status, label[x.status] || x.status));
      c.appendChild(el("h3", "", t(x, "title")));
      c.appendChild(el("p", "", t(x, "note")));
      wip.appendChild(c);
    });
  }
})();
