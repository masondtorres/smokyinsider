"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSavedCount } from "@/lib/my-plan";

const items = [
  { href: "/", label: "Home" },
  { href: "/do", label: "Do" },
  { href: "/stay", label: "Stay" },
  { href: "/my-plan", label: "Plan" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getSavedCount());
    const handler = () => setCount(getSavedCount());
    window.addEventListener("myplan-update", handler);
    return () => window.removeEventListener("myplan-update", handler);
  }, []);

  return (
    <nav
      aria-label="Mobile primary"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        display: "flex",
        justifyContent: "space-around",
        padding: "0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom))",
        zIndex: 40,
      }}
      className="mobile-bottom-nav"
    >
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "0.75rem",
              fontWeight: active ? 700 : 500,
              color: active ? "var(--color-primary)" : "var(--color-text-muted)",
              textDecoration: "none",
              minWidth: "3.5rem",
              padding: "0.25rem",
            }}
          >
            <span>{item.label}</span>
            {item.href === "/my-plan" && count > 0 && (
              <span
                style={{
                  background: "var(--color-primary)",
                  color: "white",
                  borderRadius: "999px",
                  fontSize: "0.65rem",
                  padding: "0 0.35rem",
                  marginTop: "0.1rem",
                }}
              >
                {count}
              </span>
            )}
          </Link>
        );
      })}
      <style jsx>{`
        @media (min-width: 768px) {
          .mobile-bottom-nav {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}