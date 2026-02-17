"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { label: "History", href: "/#history" },
  { label: "Sacred", href: "/#cultural" },
  { label: "Explore", href: "/#explore" },
  { label: "Guides", href: "/guides" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Blog", href: "/#blog" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-wide text-accent"
        >
          Kashi
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-widest uppercase text-foreground/70 transition-colors duration-300 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth buttons - Desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-foreground/60 transition-all hover:border-accent/50 hover:text-accent"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-accent bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-accent transition-all hover:bg-accent hover:text-accent-foreground"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
              isMobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
              isMobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
              isMobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-b border-border bg-background/95 backdrop-blur-md transition-all duration-500 lg:hidden ${
          isMobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="text-sm font-medium tracking-widest uppercase text-foreground/70 transition-colors duration-300 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-border" />
          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setIsMobileOpen(false)}
                className="text-sm font-medium tracking-widest uppercase text-accent"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMobileOpen(false);
                }}
                className="text-left text-sm font-medium tracking-widest uppercase text-foreground/50 hover:text-accent"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="text-sm font-medium tracking-widest uppercase text-foreground/70 hover:text-accent"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileOpen(false)}
                className="text-sm font-medium tracking-widest uppercase text-accent"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
