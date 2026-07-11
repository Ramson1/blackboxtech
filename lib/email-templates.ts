// ─── Branded Email Templates ────────────────────────────────────────────────────
// Shared branded email wrapper for all transactional emails.
// Uses absolute URLs since emails cannot reference local files.

const LOGO_URL = "https://blackboxtech-nine.vercel.app/logos/logoBlack.png";
const SITE_URL = "https://blackboxtech-nine.vercel.app";

export function emailHeader(title: string, gradient: string) {
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td style="background: ${gradient}; padding: 1.75rem 2rem; border-radius: 1rem 1rem 0 0; text-align: center;">
          <img src="${LOGO_URL}" alt="BlackBox Tech" width="48" height="48" style="display: block; margin: 0 auto 0.75rem; border-radius: 0.5rem;" />
          <h1 style="color: #ffffff; margin: 0; font-size: 1.35rem; font-weight: 800; letter-spacing: -0.01em; line-height: 1.3;">${title}</h1>
        </td>
      </tr>
    </table>`;
}

export function emailFooter() {
  const phoneDisplay = "+234 805 020 5349";
  const phoneTel = "+234805020534 9".replace(/\s/g, "");
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td style="padding: 1.5rem 2rem; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0 0 0.5rem; font-size: 0.8rem; color: #9ca3af;">
            <strong style="color: #374151;">BlackBox Tech</strong> — Discover. Design. Deliver.
          </p>
          <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: #9ca3af;">
            <a href="mailto:info@blackboxtech.online" style="color: #fb4545dc; text-decoration: none;">info@blackboxtech.online</a>
            <span style="color: #d1d5db; margin: 0 0.4rem;">|</span>
            <a href="tel:${phoneTel}" style="color: #fb4545dc; text-decoration: none;">${phoneDisplay}</a>
          </p>
          <p style="margin: 0; font-size: 0.75rem;">
            <a href="${SITE_URL}" style="color: #fb4545dc; text-decoration: none; font-weight: 600;">Visit Website</a>
          </p>
        </td>
      </tr>
    </table>`;
}

export function wrapEmail(content: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #ffffff; border-radius: 1rem; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        ${content}
      </div>
      <p style="text-align: center; font-size: 0.7rem; color: #9ca3af; margin-top: 1rem;">
        &copy; ${new Date().getFullYear()} BlackBox Tech. All rights reserved.
      </p>
    </div>`;
}

// Gradient presets
export const GRADIENTS = {
  student: "linear-gradient(135deg, #fb4545dc 0%, #ddd7fd 100%)",
  professional: "linear-gradient(135deg, #ddd7fd 0%, #fb4545dc 100%)",
  build: "linear-gradient(135deg, #1b1b1b 0%, #374151 100%)",
  contact: "linear-gradient(135deg, #fb4545dc 0%, #ddd7fd 100%)",
};
