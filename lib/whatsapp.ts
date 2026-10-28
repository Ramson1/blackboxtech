import { contactInfo } from "./content";
import { getStoredAttribution } from "./attribution";

/** Raw WhatsApp number in international format without the "+". */
export const WHATSAPP_NUMBER = contactInfo.phone.replace(/[\s+]/g, "");

/**
 * Build a wa.me deep link with a context-aware pre-filled message.
 * Appends the current page path and, when present, the utm_campaign that
 * brought the visitor in — so every conversation is traceable to a video
 * or ad without any extra work from the user.
 */
export function buildWhatsAppUrl(baseMessage: string): string {
  if (typeof window === "undefined") {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(baseMessage)}`;
  }
  const { utm_campaign } = getStoredAttribution();
  return buildWhatsAppUrlWithParams(baseMessage, window.location.pathname, utm_campaign);
}

/**
 * Server/React-safe variant that cannot read window — used when the path
 * and campaign are passed in explicitly.
 */
export function buildWhatsAppUrlWithParams(
  baseMessage: string,
  pagePath?: string,
  utmCampaign?: string,
): string {
  let message = baseMessage;
  if (pagePath) message += ` (Page: ${pagePath}`;
  if (pagePath && utmCampaign) message += ` | via campaign: ${utmCampaign}`;
  if (pagePath) message += ")";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
