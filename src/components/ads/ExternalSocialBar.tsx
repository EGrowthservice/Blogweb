"use client";

import { useEffect } from "react";

const SCRIPT_URL =
  "https://bicea.org/14/c06e91e278cc944a64c7da292d9c0a33";

export default function ExternalSocialBar() {
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
      .catch((err) => console.error("Failed to load ExternalSocialBar config:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
}
