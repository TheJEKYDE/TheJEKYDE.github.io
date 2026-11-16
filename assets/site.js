// Renders news + work-in-progress from news.js. Works on the home page and on game pages.
(function () {
  var root = document.body.getAttribute("data-root") || "";
  var game = document.body.getAttribute("data-game");
  var fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });
  var label = { building: "In development", testing: "Testing", planned: "Planned" };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  var feed = document.getElementById("news-feed");
  if (feed) {
    var limit = parseInt(feed.getAttribute("data-limit") || "0", 10);
    var items = (window.NEWS || []).filter(function (n) { return !game || n.game === game; })
      .sort(function (a, b) { return b.date.localeCompare(a.date); });
    if (limit) items = items.slice(0, limit);
    if (!items.length) feed.replaceWith(el("p", "empty", "Nothing here yet. Check back soon."));
    items.forEach(function (n) {
      var li = el("li", n.kind === "milestone" ? "milestone" : "");
      var meta = el("div", "meta");
      meta.appendChild(el("time", "", fmt.format(new Date(n.date))));
      if (!game && window.GAMES[n.game]) {
        var a = el("a", "from", window.GAMES[n.game].name);
        a.href = root + window.GAMES[n.game].url;
        meta.appendChild(a);
      }
      li.appendChild(meta);
      li.appendChild(el("h3", "", n.title));
      li.appendChild(el("p", "", n.text));
      feed.appendChild(li);
    });
  }

  var wip = document.getElementById("wip");
  if (wip) {
    var w = (window.WIP || []).filter(function (x) { return x.game === game; });
    if (!w.length) wip.replaceWith(el("p", "empty", "Nothing in development right now."));
    w.forEach(function (x) {
      var c = el("div", "wip-card");
      c.appendChild(el("span", "chip " + x.status, label[x.status] || x.status));
      c.appendChild(el("h3", "", x.title));
      c.appendChild(el("p", "", x.note));
      wip.appendChild(c);
    });
  }
})();
