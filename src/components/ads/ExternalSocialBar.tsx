"use client";

import { useEffect } from "react";

const SCRIPT_URL =
  "https://bicea.org/14/c06e91e278cc944a64c7da292d9c0a33";

export default function ExternalSocialBar() {
  useEffect(() => {
    const existing = document.querySelector(
      `script[src="${SCRIPT_URL}"]`
    );

    if (existing) return;

    const script = document.createElement("script");

    script.setAttribute("data-cfasync", "false");
    script.src = SCRIPT_URL;

    document.body.appendChild(script);

    return () => {
      // Giữ script sau khi load.
    };
  }, []);

  return null;
}
