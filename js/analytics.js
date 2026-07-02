/* ════════════════════════════════════════════════════════
   AndyAzhTEC.com — analytics.js
   Tracking base preparado para Supabase
════════════════════════════════════════════════════════ */

"use strict";

const AAT_ANALYTICS = (function () {
  const APP_NAME = "andyazhtec";
  const STORAGE_KEY = "aat_visitor_id";

  function getVisitorId() {
    let id = localStorage.getItem(STORAGE_KEY);

    if (!id) {
      id = "aat_" + crypto.randomUUID();
      localStorage.setItem(STORAGE_KEY, id);
    }

    return id;
  }

  function track(eventType, eventName, metadata = {}) {
    const payload = {
      app: APP_NAME,
      event_type: eventType,
      event_name: eventName,
      page: location.pathname,
      visitor_id: getVisitorId(),
      metadata,
      created_at: new Date().toISOString()
    };

    console.log("[AAT_ANALYTICS]", payload);

    /*
      FASE 2:
      Acá conectamos Supabase.

      Ejemplo futuro:
      await supabase.from("analytics_events").insert(payload);
    */

    return payload;
  }

  function initAutoTracking() {
    track("page_view", "page_loaded", {
      title: document.title,
      referrer: document.referrer || null
    });

    document.addEventListener("click", (event) => {
      const target = event.target.closest("[data-track]");
      if (!target) return;

      track("click", target.dataset.track, {
        href: target.getAttribute("href") || null,
        label: target.textContent.trim().slice(0, 120)
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAutoTracking);
  } else {
    initAutoTracking();
  }

  return { track };
})();
