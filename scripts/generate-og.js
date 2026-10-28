const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="70%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#2a1820" />
      <stop offset="50%" stop-color="#16161a" />
      <stop offset="100%" stop-color="#0e0e11" />
    </radialGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fb4545" />
      <stop offset="100%" stop-color="#ddd7fd" />
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="url(#bg)" />

  <circle cx="1050" cy="150" r="280" fill="#fb4545" opacity="0.12" filter="blur(60px)" />
  <circle cx="150" cy="500" r="240" fill="#ddd7fd" opacity="0.08" filter="blur(60px)" />

  <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />

  <g transform="translate(80, 90)">
    <rect width="170" height="36" rx="18" fill="rgba(251,69,69,0.15)" stroke="#fb4545" stroke-width="1" />
    <text x="85" y="23" fill="#fb4545" font-family="sans-serif" font-size="13" font-weight="700" text-anchor="middle" letter-spacing="1.5">BLACKBOX TECH</text>
  </g>

  <text x="80" y="200" fill="url(#accent)" font-family="sans-serif" font-size="24" font-weight="800" letter-spacing="4">DISCOVER. DESIGN. DELIVER.</text>

  <text x="80" y="280" fill="#ffffff" font-family="sans-serif" font-size="54" font-weight="900" letter-spacing="-1">Custom Software Engineering</text>
  <text x="80" y="345" fill="#ffffff" font-family="sans-serif" font-size="54" font-weight="900" letter-spacing="-1">&amp; Tech Training Academy</text>

  <text x="80" y="420" fill="#9ca3af" font-family="sans-serif" font-size="22" font-weight="400">From Startup MVPs &amp; Enterprise Systems to Hands-on Coding Programs</text>

  <g transform="translate(80, 480)">
    <rect width="200" height="44" rx="10" fill="rgba(255,255,255,0.06)" />
    <text x="100" y="27" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">Custom Web &amp; Mobile</text>

    <rect x="215" width="170" height="44" rx="10" fill="rgba(255,255,255,0.06)" />
    <text x="300" y="27" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">AI &amp; Cloud Systems</text>

    <rect x="400" width="210" height="44" rx="10" fill="rgba(255,255,255,0.06)" />
    <text x="505" y="27" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">Student &amp; Pro Training</text>
  </g>

  <text x="1120" y="555" fill="#6b7280" font-family="sans-serif" font-size="16" font-weight="600" text-anchor="end">blackboxtech.online</text>
</svg>
`;

sharp(Buffer.from(svg))
  .png({ quality: 90 })
  .toFile(path.join(process.cwd(), 'public', 'og-image.png'))
  .then(() => console.log('public/og-image.png (1200x630) created successfully!'))
  .catch(console.error);
