/* Weiner portfolio — no router needed: every page is a real document. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scroll reveals ---------- */
  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.03 });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById("burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.textContent = open ? "Close" : "Menu";
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") {
        document.body.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.textContent = "Menu";
      }
    });
  }

  /* ---------- highlight the section in view (home page only) ---------- */
  var links = [].slice.call(document.querySelectorAll('.navset a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute("href") === "#" + e.target.id) a.setAttribute("aria-current", "page");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (sec) { spy.observe(sec); });
  }

  /* ---------- video loops ---------- */
  var vids = [].slice.call(document.querySelectorAll("video"));

  /* motion turned off: hold the poster frame, hand control to the visitor */
  if (reduce && vids.length) {
    vids.forEach(function (v) {
      v.autoplay = false;
      v.loop = false;
      v.removeAttribute("autoplay");
      v.removeAttribute("loop");
      v.setAttribute("controls", "");
      v.pause();
      v.currentTime = 0;
    });
    return;
  }

  /* otherwise: pause the loops when they are off screen */
  if ("IntersectionObserver" in window && vids.length) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.play().catch(function () {}); }
        else { e.target.pause(); }
      });
    }, { threshold: 0.1 });
    vids.forEach(function (v) { vio.observe(v); });
  }
})();
