"use client";

import { useEffect } from "react";

const SCRIPT_URL =
  "https://afders.org/1/04549fd6cd85d3bebfd8de953ce554b9";

export default function ExternalPopunder() {
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
      // Không remove script vì network có thể cần listener đã đăng ký.
    };
  }, []);

  return null;
}
