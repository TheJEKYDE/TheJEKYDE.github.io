// Language switch (NL/EN) + news and work-in-progress feed from news.js.
(function () {
  var root = document.body.getAttribute("data-root") || "";
  var game = document.body.getAttribute("data-game");

  // ---- language ----
  function saved() { try { return localStorage.getItem("lang"); } catch (e) { return null; } }
  function setLang(l, remember) {
    document.documentElement.lang = l;
    document.title = document.body.getAttribute("data-title-" + l) || document.title;
    var b = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < b.length; i++) b[i].setAttribute("aria-pressed", b[i].getAttribute("data-set-lang") === l ? "true" : "false");
    if (remember) { try { localStorage.setItem("lang", l); } catch (e) {} }
  }
  var start = saved() || ((navigator.language || "").slice(0, 2) === "nl" ? "nl" : "en");
  setLang(start, false);
  var btns = document.querySelectorAll("[data-set-lang]");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (e) { setLang(e.currentTarget.getAttribute("data-set-lang"), true); });
  }

  // ---- helpers: every text exists in both languages, CSS shows the active one ----
  var fmt = { en: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }),
              nl: new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric" }) };
  var chips = { en: { building: "In development", testing: "Testing", planned: "Planned" },
                nl: { building: "In ontwikkeling", testing: "Wordt getest", planned: "Gepland" } };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function both(parent, tag, cls, getter) {
    ["en", "nl"].forEach(function (l) {
      var n = el(tag, cls, getter(l));
      n.setAttribute("data-l", l);
      parent.appendChild(n);
    });
  }
  function pick(o, k, l) { return l === "nl" && o.nl && o.nl[k] ? o.nl[k] : o[k]; }

  // ---- news ----
  var feed = document.getElementById("news-feed");
  if (feed) {
    var limit = parseInt(feed.getAttribute("data-limit") || "0", 10);
    var items = (window.NEWS || []).filter(function (n) { return !game || n.game === game || n.game === "all"; })
      .sort(function (a, b) { return b.date.localeCompare(a.date); });
    if (limit) items = items.slice(0, limit);
    if (!items.length) {
      var empty = el("p", "empty");
      both(empty, "span", "", function (l) { return l === "nl" ? "Nog niets te melden." : "Nothing here yet. Check back soon."; });
      feed.replaceWith(empty);
    }
    items.forEach(function (n) {
      var li = el("li", n.kind === "milestone" ? "milestone" : "");
      var meta = el("div", "meta");
      both(meta, "time", "", function (l) { return fmt[l].format(new Date(n.date)); });
      if (!game && n.game !== "all" && window.GAMES[n.game]) {
        var a = el("a", "from", window.GAMES[n.game].name);
        a.href = root + window.GAMES[n.game].url;
        meta.appendChild(a);
      }
      li.appendChild(meta);
      var h = el("h3"); both(h, "span", "", function (l) { return pick(n, "title", l); }); li.appendChild(h);
      both(li, "p", "", function (l) { return pick(n, "text", l); });
      feed.appendChild(li);
    });
  }

  // ---- work in progress ----
  var wip = document.getElementById("wip");
  if (wip) {
    var w = (window.WIP || []).filter(function (x) { return x.game === game; });
    if (!w.length) {
      var none = el("p", "empty");
      both(none, "span", "", function (l) { return l === "nl" ? "Op dit moment is er niets in ontwikkeling." : "Nothing in development right now."; });
      wip.replaceWith(none);
    }
    w.forEach(function (x) {
      var c = el("div", "wip-card");
      var chipWrap = el("div");
      ["en", "nl"].forEach(function (l) {
        var s = el("span", "chip " + x.status, chips[l][x.status] || x.status);
        s.setAttribute("data-l", l);
        chipWrap.appendChild(s);
      });
      c.appendChild(chipWrap);
      var h = el("h3"); both(h, "span", "", function (l) { return pick(x, "title", l); }); c.appendChild(h);
      both(c, "p", "", function (l) { return pick(x, "note", l); });
      wip.appendChild(c);
    });
  }
})();
