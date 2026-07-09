// Loads the ChatFactory widget from the PathFactory CDN and initialises it on
// every page. Mirrors the snippet used on real customer pages, so the harness
// exercises the same code path that produces the PFS-4400 phantom Safari
// history entry.
//
// To point the harness at a different environment or agent, edit CHAT_CONFIG
// and/or WIDGET_SRC below.

(function () {
  const WIDGET_SRC =
    "https://cdn-app.pathfactory-development.com/libraries/chatfactory/widget/index.js";

  const CHAT_CONFIG = {
    token: "f4ba9ffc-dd14-4a02-affe-f41095f00305",
    clientId: "LB-DAE926E6-125",
    apiHost: "https://jukebox.pathfactory-development.com",
    widgetType: "test_search",
  };

  // Flip to false to silence the widget's own debug logging.
  window.__PF_CF_ACTIVATORS_DEBUG__ = true;

  // Only run in the top window — same guard the production snippet uses.
  if (window.location !== window.parent.location) return;

  function init() {
    if (typeof window.initializeChatWidget !== "function") {
      console.warn(
        "[back-button-test] initializeChatWidget missing after CDN load — check network tab for widget/index.js."
      );
      return;
    }
    window.initializeChatWidget(CHAT_CONFIG);
  }

  // Inject the CDN script tag dynamically so the HTML pages don't have to
  // repeat it. If it's already on the page (e.g. someone hard-coded it in
  // an <html> file for a hybrid test), reuse it instead of duplicating.
  const existing = document.querySelector(`script[src="${WIDGET_SRC}"]`);
  if (existing) {
    if (typeof window.initializeChatWidget === "function") {
      init();
    } else {
      existing.addEventListener("load", init, { once: true });
      existing.addEventListener("error", () =>
        console.error("[back-button-test] widget CDN failed to load:", WIDGET_SRC)
      );
    }
    return;
  }

  const s = document.createElement("script");
  s.src = WIDGET_SRC;
  s.async = false; // preserve load order — widget must be defined before init()
  s.onload = init;
  s.onerror = () =>
    console.error("[back-button-test] widget CDN failed to load:", WIDGET_SRC);
  document.head.appendChild(s);
})();
