"use client";

import { useEffect } from "react";

const SCRIPT_URL =
  "https://afders.org/1/04549fd6cd85d3bebfd8de953ce554b9";

export default function ExternalPopunder() {
  useEffect(() => {
    let isMounted = true;

    fetch('/api/settings/advertising')
      .then((res) => res.json())
      .then((json) => {
        if (!isMounted) return;
        if (!json?.success || !json?.data?.adsterraEnabled) {
          return;
        }

        const existing = document.querySelector(
          `script[src="${SCRIPT_URL}"]`
        );
        if (existing) return;

        const script = document.createElement("script");
        script.setAttribute("data-cfasync", "false");
        script.src = SCRIPT_URL;
        document.body.appendChild(script);
      })
      .catch((err) => console.error("Failed to load ExternalPopunder config:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
}
