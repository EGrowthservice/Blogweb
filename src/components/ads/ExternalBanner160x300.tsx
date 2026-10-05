"use client";

import { useEffect, useRef } from "react";

const AD_KEY = "850cdc4e8dbdf125fffd09f647b32e54";
const AD_SCRIPT = `https://bicea.org/22/${AD_KEY}`;

export default function ExternalBanner160x300() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Không inject lại khi React re-render
    if (container.dataset.loaded === "true") return;

    container.dataset.loaded = "true";

    const optionsScript = document.createElement("script");

    optionsScript.type = "text/javascript";
    optionsScript.text = `
      atOptions = {
        'key': '${AD_KEY}',
        'format': 'iframe',
        'height': 300,
        'width': 160,
        'params': {}
      };
    `;

    const adScript = document.createElement("script");

    adScript.type = "text/javascript";
    adScript.src = AD_SCRIPT;

    container.appendChild(optionsScript);
    container.appendChild(adScript);

    return () => {
      // Không xoá DOM khi React Strict Mode chạy effect lần đầu
      // để tránh inject script trùng.
    };
  }, []);

  return (
    <div className="my-6 flex w-full justify-center overflow-hidden">
      <div
        ref={containerRef}
        style={{
          width: "160px",
          minHeight: "300px",
        }}
        aria-label="Advertisement"
      />
    </div>
  );
}
