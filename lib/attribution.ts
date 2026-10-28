"use client";

import { useEffect, useState } from "react";

/**
 * Marketing attribution capture engine.
 *
 * Extracts UTM parameters, ad-platform click IDs (fbclid/ttclid/gclid),
 * the referrer and the landing page on first paint, persists them for the
 * session (sessionStorage) and for 30 days (first-touch cookie), and exposes
 * them so forms/API calls can attach full lead source data.
 */

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  ttclid?: string;
  gclid?: string;
  referrer?: string;
  landing_page?: string;
  first_seen?: string;
};

const SESSION_KEY = "bbtech_attribution";
const COOKIE_NAME = "bb_attrib";
const COOKIE_MAX_AGE_DAYS = 30;

const TRACKED_KEYS: (keyof Attribution)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "ttclid",
  "gclid",
];

function readCookieAttribution(): Attribution {
  try {
    const match = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${COOKIE_NAME}=`));
    if (!match) return {};
    return JSON.parse(decodeURIComponent(match.slice(COOKIE_NAME.length + 1)));
  } catch {
    return {};
  }
}

function writeCookieAttribution(attribution: Attribution) {
  try {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(attribution),
    )}; path=/; max-age=${COOKIE_MAX_AGE_DAYS * 24 * 60 * 60}; SameSite=Lax`;
  } catch {
    // Cookie writes can fail in restricted contexts — non-fatal.
  }
}

/** Parse tracked params from a query string and build an attribution object. */
export function parseAttribution(search: string): Attribution {
  const attribution: Attribution = {};
  try {
    const params = new URLSearchParams(search);
    for (const key of TRACKED_KEYS) {
      const value = params.get(key);
      if (value) (attribution as Record<string, string>)[key] = value.slice(0, 300);
    }
  } catch {
    // Malformed query string — return whatever we have.
  }
  return attribution;
}

/**
 * Capture attribution into sessionStorage + first-touch cookie.
 * Runs once per page load; safe to call from any client component.
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const incoming = parseAttribution(window.location.search);
  const hasIncoming = Object.keys(incoming).length > 0;

  let stored: Attribution = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "{}");
  } catch {
    stored = {};
  }
  const firstTouch = readCookieAttribution();

  // Merge: incoming (this click) > session (this visit) > cookie (first touch)
  const merged: Attribution = { ...firstTouch, ...stored };
  if (hasIncoming) {
    Object.assign(merged, incoming);
  }
  if (!merged.first_seen) {
    merged.first_seen = new Date().toISOString();
  }
  if (!merged.landing_page) {
    merged.landing_page = window.location.pathname;
  }
  if (!merged.referrer && document.referrer) {
    merged.referrer = document.referrer;
  }

  // Persist first-touch cookie for every visitor (not just UTM hits) so
  // server-side API routes can read referrer/landing page as a fallback.
  if (Object.keys(firstTouch).length === 0) {
    writeCookieAttribution(merged);
  }

  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(merged));
  } catch {
    // Storage may be unavailable in private modes — non-fatal.
  }
  return merged;
}

/** Read the current session attribution (falls back to first-touch cookie). */
export function getStoredAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session) return JSON.parse(session);
  } catch {
    // ignore
  }
  return readCookieAttribution();
}

/** React hook: captures attribution on mount and returns it. */
export function useAttribution(): Attribution {
  const [attribution, setAttribution] = useState<Attribution>({});
  useEffect(() => {
    setAttribution(captureAttribution());
  }, []);
  return attribution;
}
