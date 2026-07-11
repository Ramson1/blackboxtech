"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [ctaOpen, setCtaOpen] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [btnPos, setBtnPos] = useState({ top: 0, right: 0 });

  // Close CTA dropdown on click outside (checks both button and portal dropdown)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        ctaRef.current && !ctaRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setCtaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Calculate dropdown position (portal renders at body level)
  useEffect(() => {
    if (ctaOpen && ctaRef.current) {
      const rect = ctaRef.current.getBoundingClientRect();
      setBtnPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
    }
  }, [ctaOpen]);

  // Track active section on scroll (only for hash-based links)
  useEffect(() => {
    const sectionIds = navLinks
      .filter((link) => link.href.startsWith("#"))
      .map((link) => link.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${id}`);
          }
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper to resolve nav link href
  const resolveHref = (href: string) => {
    if (href.startsWith("/")) return href;
    if (isHome) return href;
    return `/${href}`;
  };

  return (
    <>
      {/* Floating pill navbar — fully inline styled to guarantee visibility */}
      <header
        style={{
          position: "fixed",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          width: "80%",
          maxWidth: "64rem",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "3.5rem",
            padding: "0 1.5rem",
            borderRadius: "9999px",
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(200,200,200,0.5)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0 }}>
            <Image
              src="/logos/logoBlackPlain.png"
              alt="BlackBox Tech"
              width={32}
              height={32}
              style={{ objectFit: "contain", width: "auto", height: "auto" }}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div
            className="hidden md:flex"
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {navLinks.map((link) => {
              const resolvedHref = resolveHref(link.href);
              const isActive = link.href.startsWith("#") && activeLink === link.href;
              const isPageActive = link.href.startsWith("/") && pathname === link.href;
              const highlight = isActive || isPageActive;
              return (
                <Link
                  key={link.label}
                  href={resolvedHref}
                  onClick={() => { if (link.href.startsWith("#")) setActiveLink(link.href); }}
                  style={{
                    padding: "0.375rem 0.875rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "all 0.2s",
                    backgroundColor: highlight ? "#fb4545dc" : "rgba(255, 255, 255, 0.06)",
                    color: highlight ? "#ffffff" : "#111111",
                    boxShadow: highlight ? "0 2px 8px rgba(243,146,169,0.4)" : "none",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA dropdown */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.375rem" }}>
            <div ref={ctaRef} style={{ position: "relative" }}>
              <button
                onClick={() => setCtaOpen(!ctaOpen)}
                style={{
                  borderRadius: "9999px",
                  backgroundColor: "#fb4545dc",
                  color: "#ffffff",
                  padding: "0.3rem 0.875rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                Get Started
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: ctaOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
            </div>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
              style={{
                borderRadius: "9999px",
                backgroundColor: "#1b1b1b",
                color: "#ffffff",
                padding: "0.3rem 0.75rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                border: "2px solid #ffffff",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Let&apos;s Chat
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              padding: "0.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#111111",
            }}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div
            style={{
              marginTop: "0.5rem",
              borderRadius: "1.5rem",
              backgroundColor: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {navLinks.map((link) => {
              const resolvedHref = resolveHref(link.href);
              const isActive = link.href.startsWith("#") && activeLink === link.href;
              const isPageActive = link.href.startsWith("/") && pathname === link.href;
              const highlight = isActive || isPageActive;
              return (
                <Link
                  key={link.label}
                  href={resolvedHref}
                  onClick={() => {
                    if (link.href.startsWith("#")) setActiveLink(link.href);
                    setMenuOpen(false);
                  }}
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    padding: "0.5rem 1.25rem",
                    borderRadius: "9999px",
                    backgroundColor: highlight ? "#fb4545dc" : "rgba(255, 255, 255, 0.04)",
                    color: highlight ? "#ffffff" : "#1b1b1b",
                    transition: "all 0.2s",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* CTA Links */}
            <div style={{ width: "100%", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link
                href="/register/student"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "9999px",
                  backgroundColor: "#fb4545dc",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                Student Training
              </Link>
              <Link
                href="/register/professional"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "9999px",
                  backgroundColor: "#fb4545dc",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                Professional Training
              </Link>
              <Link
                href="/build"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "9999px",
                  backgroundColor: "#1b1b1b",
                  color: "#ffffff",
                  textAlign: "center",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                }}
              >
                Build My Software
              </Link>
            </div>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-chat"));
                setMenuOpen(false);
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "9999px",
                backgroundColor: "#1b1b1b",
                color: "#ffffff",
                padding: "0.625rem 2rem",
                fontSize: "1rem",
                fontWeight: 500,
                textDecoration: "none",
                border: "2px solid #ffffff",
                cursor: "pointer",
              }}
            >
              Let&apos;s Chat
            </button>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div style={{ height: "5rem" }} />

      {/* CTA Dropdown rendered via portal to avoid nav clipping */}
      {ctaOpen && typeof document !== "undefined" && createPortal(
        <div ref={dropdownRef} style={{
          position: "fixed",
          top: btnPos.top,
          right: btnPos.right,
          backgroundColor: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "1rem",
          border: "1px solid rgba(200,200,200,0.4)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          padding: "0.5rem",
          minWidth: "13rem",
          zIndex: 99999,
        }}>
          <Link href="/register/student" onClick={() => setCtaOpen(false)} style={{ display: "block", padding: "0.6rem 1rem", borderRadius: "0.75rem", fontSize: "0.8rem", fontWeight: 600, color: "#1b1b1b", textDecoration: "none", transition: "background 0.15s" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(251,69,69,0.08)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
            🎓 Student Training
          </Link>
          <Link href="/register/professional" onClick={() => setCtaOpen(false)} style={{ display: "block", padding: "0.6rem 1rem", borderRadius: "0.75rem", fontSize: "0.8rem", fontWeight: 600, color: "#1b1b1b", textDecoration: "none", transition: "background 0.15s" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(251,69,69,0.08)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
            💼 Professional Training
          </Link>
          <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.06)", margin: "0.25rem 0.5rem" }} />
          <Link href="/build" onClick={() => setCtaOpen(false)} style={{ display: "block", padding: "0.6rem 1rem", borderRadius: "0.75rem", fontSize: "0.8rem", fontWeight: 600, color: "#1b1b1b", textDecoration: "none", transition: "background 0.15s" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(251,69,69,0.08)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
            🛠️ Build My Software
          </Link>
        </div>,
        document.body
      )}
    </>
  );
}
