// Bottom-right diagnostic panel for PFS-4400.
//
// Shows:
//   • current path
//   • history.length
//   • Δ since the previous page load in this tab (the smoking gun on Safari)
//   • whether the ChatFactory widget actually mounted its iframe
//   • rolling log of the last 8 page loads
//
// The Δ number is the primary signal:
//   +1 = healthy   (Chrome/Firefox, or Safari with the fix)
//   +2 = buggy     (Safari with the current CDN widget)

(function () {
  const KEY = "pfCfBackTest.probe";
  const LOG_KEY = "pfCfBackTest.log";
  const NAV_KEY = "pfCfBackTest.navSeq";

  let prev;
  try {
    prev = JSON.parse(sessionStorage.getItem(KEY) || "null");
  } catch (e) {
    prev = null;
  }

  // navSeq = how many full-page navigations have happened in this tab. Uses
  // the Navigation Timing type ("navigate" vs "back_forward" vs "reload") to
  // only count real forward nav — Back/forward loads must not inflate this.
  let navSeq = 0;
  try {
    navSeq = Number(sessionStorage.getItem(NAV_KEY) || "0") || 0;
  } catch (e) {}
  const navEntry = performance.getEntriesByType &&
    performance.getEntriesByType("navigation")[0];
  const navType = (navEntry && navEntry.type) ||
    (performance.navigation && ["navigate","reload","back_forward","prerender"][performance.navigation.type]) ||
    "navigate";
  if (navType === "navigate" || navType === "reload") {
    navSeq += 1;
    try { sessionStorage.setItem(NAV_KEY, String(navSeq)); } catch (e) {}
  }

  const now = {
    path: location.pathname,
    len: history.length,
    at: Date.now(),
    navType,
    navSeq,
  };

  // Δ only meaningful on a real forward nav from a previous page in this tab.
  let delta = null;
  if (prev && (navType === "navigate" || navType === "reload") && prev.len <= now.len) {
    delta = now.len - prev.len;
  }

  // Rolling log of the last 8 loads.
  let log = [];
  try {
    log = JSON.parse(sessionStorage.getItem(LOG_KEY) || "[]");
  } catch (e) {
    log = [];
  }
  log.push({
    path: now.path,
    len: now.len,
    delta,
    navType,
    at: now.at,
  });
  if (log.length > 8) log = log.slice(-8);

  try {
    sessionStorage.setItem(KEY, JSON.stringify(now));
    sessionStorage.setItem(LOG_KEY, JSON.stringify(log));
  } catch (e) {}

  const ua = navigator.userAgent;
  const isSafari =
    /Safari\//.test(ua) && !/Chrome\//.test(ua) && !/Chromium\//.test(ua) && !/Edg\//.test(ua);

  function fmtDelta(d) {
    if (d === null || d === undefined) return "—";
    if (d === 1) return `<span class="hd-delta-ok">+1</span>`;
    if (d === 0) return `<span class="hd-delta-ok">0</span>`;
    return `<span class="hd-delta-bad">+${d}</span>`;
  }

  function render() {
    const box = document.createElement("div");
    box.id = "history-debug";
    box.innerHTML = `
      <div class="hd-title">history.length probe</div>
      <div class="hd-row"><span>path</span><b>${now.path}</b></div>
      <div class="hd-row"><span>nav #</span><b>${navSeq} (${navType})</b></div>
      <div class="hd-row"><span>history.length</span><b>${now.len}</b></div>
      <div class="hd-row"><span>Δ since prev load</span><b>${fmtDelta(delta)}</b></div>
      <div class="hd-row"><span>browser</span><b>${isSafari ? "Safari" : "Other"}</b></div>
      <div class="hd-row" id="hd-widget-row"><span>widget iframe</span><b>checking…</b></div>
      <div class="hd-log" id="hd-log"></div>
    `;
    document.body.appendChild(box);
    renderLog();
    startWidgetPresenceProbe();
  }

  function renderLog() {
    const el = document.getElementById("hd-log");
    if (!el) return;
    el.innerHTML = log
      .slice()
      .reverse()
      .map(
        (r) =>
          `<div class="hd-row"><span>${r.path}</span><span>len=${r.len} Δ=${
            r.delta === null ? "—" : r.delta
          } ${r.navType}</span></div>`
      )
      .join("");
  }

  // Detects whether the ChatFactory widget has actually inserted its iframe.
  // If it hasn't, there's no bug to reproduce — most likely the widget's
  // lookup call to jukebox failed or is_published/agent_available gates the
  // build.
  function startWidgetPresenceProbe() {
    let tries = 0;
    const row = document.getElementById("hd-widget-row");
    const tick = () => {
      tries++;
      let iframe = document.getElementById("pfCfIframe");
      if (!iframe) {
        // Widget can be inside a shadow root of a "chatShieldHost-…" node.
        document.querySelectorAll("[id^='chatShieldHost-']").forEach((h) => {
          if (!iframe && h.shadowRoot) {
            iframe = h.shadowRoot.getElementById("pfCfIframe");
          }
        });
      }
      const initFn = typeof window.initializeChatWidget === "function";
      if (iframe) {
        const src = iframe.getAttribute("src") || "";
        const isPlaceholder = src === "widget.agentSource" || src === "";
        const label = isPlaceholder
          ? `<span class="hd-delta-bad">present, placeholder src</span>`
          : `<span class="hd-delta-ok">present, real src</span>`;
        row.innerHTML = `<span>widget iframe</span><b>${label}</b>`;
        console.log("[history-probe] widget iframe detected", {
          src,
          isPlaceholder,
        });
        return;
      }
      if (tries > 20) {
        row.innerHTML = `<span>widget iframe</span><b><span class="hd-delta-bad">NOT mounted${
          initFn ? "" : " (initializeChatWidget missing)"
        }</span></b>`;
        console.warn(
          "[history-probe] widget never mounted its iframe — bug cannot reproduce. Check network tab for the cf_headless/widget lookup call.",
          { initializeChatWidgetPresent: initFn }
        );
        return;
      }
      setTimeout(tick, 500);
    };
    tick();
  }

  console.log(
    "[history-probe]",
    JSON.stringify({
      path: now.path,
      historyLength: now.len,
      deltaSincePrev: delta,
      navType,
      navSeq,
      isSafari,
    })
  );

  // Fine-grained tracker: samples history.length at 100ms intervals for the
  // first 15s of the page. Any change is logged with the timestamp relative
  // to page load and the state of the widget iframe at that moment. This
  // pinpoints *when* history.length grows — is it at initial page load, at
  // iframe insertion, or at the iframe src reassignment?
  (function fineGrainedTracker() {
    const startLen = history.length;
    const t0 = performance.now();
    let lastLen = startLen;
    let ticks = 0;
    const observations = [];

    const sample = () => {
      ticks++;
      const cur = history.length;
      if (cur !== lastLen) {
        let iframe = document.getElementById("pfCfIframe");
        if (!iframe) {
          document.querySelectorAll("[id^='chatShieldHost-']").forEach((h) => {
            if (!iframe && h.shadowRoot) {
              iframe = h.shadowRoot.getElementById("pfCfIframe");
            }
          });
        }
        const rec = {
          tMs: Math.round(performance.now() - t0),
          from: lastLen,
          to: cur,
          iframeSrc: iframe ? (iframe.getAttribute("src") || "(empty)") : "(no iframe yet)",
        };
        observations.push(rec);
        console.log("[history-probe][Δ]", rec);
        lastLen = cur;
      }
      if (ticks < 150) setTimeout(sample, 100);
      else {
        console.log("[history-probe][summary]", {
          path: location.pathname,
          startLen,
          endLen: lastLen,
          totalGrowth: lastLen - startLen,
          observations,
        });
      }
    };
    setTimeout(sample, 100);
  })();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
