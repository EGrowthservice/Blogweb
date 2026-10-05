"use client";

import { useEffect, useRef } from "react";

const NATIVE_SCRIPT =
  "https://bicea.org/21/74470e21bd820fa79f095f4933e30022";

const CONTAINER_ID =
  "container-74470e21bd820fa79f095f4933e30022";

export default function ExternalNativeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (container.dataset.loaded === "true") return;

    container.dataset.loaded = "true";

    const adContainer = document.createElement("div");
    adContainer.id = CONTAINER_ID;

    const script = document.createElement("script");

    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = NATIVE_SCRIPT;

    container.appendChild(adContainer);
    container.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-6 w-full overflow-hidden"
      aria-label="Advertisement"
    />
  );
}
