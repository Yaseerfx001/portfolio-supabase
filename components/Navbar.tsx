"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { label: "HOME", href: "/" },
  { label: "EXPERIENCE", href: "/experience" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CERTIFICATIONS", href: "/certifications" },
  { label: "BLOG", href: "/blog" },
  { label: "RESEARCH", href: "/research" },
  { label: "COMMUNITY", href: "/community" },
  { label: "TALKS", href: "/talks" },
  { label: "HONORS", href: "/honors" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside it.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-paper-light/90 dark:bg-paper-dark/90 backdrop-blur hr-line">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-lg tracking-tight">
          {name}
        </Link>

        <div className="flex items-center gap-1 relative" ref={menuRef}>
          <ThemeToggle />

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Open navigation menu"
            className="rounded-full p-2 hover:bg-ink-light/5 dark:hover:bg-ink-dark/10 transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav
            className={`absolute right-0 top-12 w-56 bg-paper-light dark:bg-paper-dark hr-line border rounded-md shadow-sm py-2 origin-top-right transition-all duration-150 ease-out ${
              open
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-accent/10 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
