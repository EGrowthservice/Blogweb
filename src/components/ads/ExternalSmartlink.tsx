"use client";

import React from "react";

interface ExternalSmartlinkProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
}

export default function ExternalSmartlink({
  children = "Read More",
  className = "",
  href = "/all-stories",
}: ExternalSmartlinkProps) {
  return (
    <a
      href={href}
      className={className}
    >
      {children}
    </a>
  );
}
