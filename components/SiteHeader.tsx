"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSavedCount } from "@/lib/my-plan";

const primaryNav = [
  { href: "/go", label: "Go" },
  { href: "/do", label: "Do" },
  { href: "/see", label: "See" },
  { href: "/eat", label: "Eat" },
  { href: "/stay", label: "Stay" },
  { href: "/deals", label: "Deals" },
  { href: "/my-plan", label: "My Plan" },
];

export function SiteHeader() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getSavedCount());
    const onStorage = () => setCount(getSavedCount());
    window.addEventListener("storage", onStorage);
    // Custom event for same-tab updates
    window.addEventListener("myplan-update", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("myplan-update", onStorage);
    };
  }, []);

  return (
    <header
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "3.5rem",
          gap: "1rem",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "var(--color-primary)",
            textDecoration: "none",
          }}
        >
          SmokyInsider
        </Link>

        <nav
          aria-label="Primary"
          style={{
            display: "none",
          }}
          className="desktop-nav"
        >
          {/* Desktop nav shown via CSS media query in a real stylesheet */}
          <ul
            style={{
              display: "flex",
              gap: "1.25rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    color: "var(--color-text)",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                >
                  {item.label}
                  {item.href === "/my-plan" && count > 0 && (
                    <span
                      style={{
                        marginLeft: "0.35rem",
                        background: "var(--color-primary)",
                        color: "white",
                        borderRadius: "999px",
                        padding: "0.1rem 0.45rem",
                        fontSize: "0.75rem",
                      }}
                    >
                      {count}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/my-plan"
          style={{
            background: "var(--color-primary)",
            color: "white",
            padding: "0.4rem 0.85rem",
            borderRadius: "var(--radius-md)",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          My Plan{count > 0 ? ` (${count})` : ""}
        </Link>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}