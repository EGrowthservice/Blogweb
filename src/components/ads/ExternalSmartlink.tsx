"use client";

const SMARTLINK =
  "https://arwf.org/4/eaae549f64515b95b9774c18106759c8";

interface ExternalSmartlinkProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ExternalSmartlink({
  children = "Xem thêm",
  className = "",
}: ExternalSmartlinkProps) {
  return (
    <a
      href={SMARTLINK}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
