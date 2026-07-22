"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSavedCount } from "@/lib/my-plan";

const primaryNav = [
  { href: "/start-here", label: "Start Here" },
  { href: "/go", label: "Go" },
  { href: "/do", label: "Do" },
  { href: "/see", label: "See" },
  { href: "/eat", label: "Eat" },
  { href: "/stay", label: "Stay" },
  { href: "/deals", label: "Deals" },
  { href: "/visitor-resources", label: "Resources" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getSavedCount());
    const onStorage = () => setCount(getSavedCount());
    window.addEventListener("storage", onStorage);
    window.addEventListener("myplan-update", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("myplan-update", onStorage);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__visual">
        <div className="container site-header__brand-row">
          <Link href="/" className="site-brand" aria-label="Smoky Insider home">
            <span className="site-brand__mark" aria-hidden="true">
              <svg viewBox="0 0 64 64" role="img">
                <path d="M5 47 21 24l8 11L39 18l20 29H5Z" fill="currentColor" opacity="0.95" />
                <path d="M8 49h48M14 54h36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
              </svg>
            </span>
            <span className="site-brand__copy">
              <span className="site-brand__name">Smoky Insider</span>
              <span className="site-brand__tagline">Local judgment for trips that actually work</span>
            </span>
          </Link>

          <div className="site-header__actions">
            <Link href="/start-planning" className="header-button header-button--light">
              Start planning
            </Link>
            <Link href="/my-plan" className="header-button header-button--solid">
              My Plan{count > 0 ? ` (${count})` : ""}
            </Link>
          </div>
        </div>
      </div>

      <nav className="site-header__nav" aria-label="Primary">
        <div className="container site-header__nav-inner">
          <ul className="site-header__nav-list">
            {primaryNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`site-header__nav-link${active ? " is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
