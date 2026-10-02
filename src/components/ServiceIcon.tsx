import type { Service } from "../data/content";

const Defs = () => (
  <defs>
    <linearGradient id="si-pink" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#FF9DBE" />
      <stop offset="1" stopColor="#E94F83" />
    </linearGradient>
    <linearGradient id="si-soft" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="1" stopColor="#FCE3EB" />
    </linearGradient>
    <linearGradient id="si-light" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#FFC7D9" />
      <stop offset="1" stopColor="#F58AAE" />
    </linearGradient>
    <radialGradient id="si-gloss" cx=".3" cy=".2" r=".6">
      <stop offset="0" stopColor="#fff" stopOpacity=".85" />
      <stop offset="1" stopColor="#fff" stopOpacity="0" />
    </radialGradient>
  </defs>
);

export default function ServiceIcon({ name, size = 68 }: { name: Service["icon"]; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden style={{ filter: "drop-shadow(0 10px 14px rgba(233,79,131,.28))" }}>
      <Defs />
      {name === "code" && (
        <g>
          <rect x="8" y="14" width="64" height="52" rx="10" fill="url(#si-soft)" stroke="#F7B6C8" />
          <path d="M8 24a10 10 0 0 1 10-10h44a10 10 0 0 1 10 10v2H8v-2Z" fill="url(#si-pink)" />
          <circle cx="17" cy="20" r="2" fill="#fff" />
          <circle cx="24" cy="20" r="2" fill="#fff" opacity=".8" />
          <circle cx="31" cy="20" r="2" fill="#fff" opacity=".6" />
          <path d="m32 38-8 8 8 8M48 38l8 8-8 8M44 34l-8 24" stroke="#E94F83" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {name === "pen" && (
        <g>
          <path d="M14 26c14-10 38-10 52 0" stroke="#F58AAE" strokeWidth="2" fill="none" />
          <circle cx="14" cy="26" r="5" fill="url(#si-pink)" />
          <circle cx="66" cy="26" r="5" fill="url(#si-pink)" />
          <circle cx="40" cy="12" r="5" fill="url(#si-pink)" />
          <path d="M40 17v10" stroke="#F58AAE" strokeWidth="2" />
          <path d="M40 26 26 46l8 18h12l8-18-14-20Z" fill="url(#si-pink)" />
          <path d="M40 26 26 46l8 18h6V26Z" fill="#fff" opacity=".18" />
          <circle cx="40" cy="48" r="4" fill="#fff" />
          <path d="M40 30v14" stroke="#fff" strokeWidth="1.6" />
          <rect x="31" y="64" width="18" height="8" rx="3" fill="#D63B70" />
        </g>
      )}
      {name === "bot" && (
        <g>
          <path d="M40 10v8" stroke="#E94F83" strokeWidth="2.4" />
          <circle cx="40" cy="9" r="4" fill="url(#si-pink)" />
          <rect x="12" y="18" width="56" height="46" rx="20" fill="url(#si-light)" />
          <rect x="12" y="18" width="56" height="46" rx="20" fill="url(#si-gloss)" />
          <rect x="7" y="34" width="7" height="14" rx="3.5" fill="#E94F83" />
          <rect x="66" y="34" width="7" height="14" rx="3.5" fill="#E94F83" />
          <rect x="20" y="28" width="40" height="26" rx="12" fill="#2A1E26" />
          <circle cx="31" cy="40" r="4" fill="#FF8FB6" />
          <circle cx="49" cy="40" r="4" fill="#FF8FB6" />
          <path d="M35 47c3 2.5 7 2.5 10 0" stroke="#FF8FB6" strokeWidth="2" fill="none" strokeLinecap="round" />
          <rect x="30" y="64" width="20" height="8" rx="4" fill="#F58AAE" />
        </g>
      )}
      {name === "heart" && (
        <g>
          <path d="M16 12h48a10 10 0 0 1 10 10v28a10 10 0 0 1-10 10H34l-12 10v-10h-6A10 10 0 0 1 6 50V22a10 10 0 0 1 10-10Z" fill="url(#si-pink)" />
          <path d="M16 12h48a10 10 0 0 1 10 10v10C50 20 30 22 6 34V22a10 10 0 0 1 10-10Z" fill="url(#si-gloss)" />
          <path d="M40 50s-13-8-13-17c0-4 3-7 7-7 2.6 0 4.6 1.4 6 3.4 1.4-2 3.4-3.4 6-3.4 4 0 7 3 7 7 0 9-13 17-13 17Z" fill="#fff" />
        </g>
      )}
      {name === "bag" && (
        <g>
          <path d="M28 26v-4a12 12 0 0 1 24 0v4" stroke="#E94F83" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M14 26h52l-4 42a6 6 0 0 1-6 5H24a6 6 0 0 1-6-5l-4-42Z" fill="url(#si-pink)" />
          <path d="M14 26h52l-1 10C48 30 30 32 15 40l-1-14Z" fill="url(#si-gloss)" />
          <path d="M40 58s-9-5.5-9-11.5c0-2.8 2-4.8 4.6-4.8 1.8 0 3.4 1 4.4 2.4 1-1.4 2.6-2.4 4.4-2.4 2.6 0 4.6 2 4.6 4.8 0 6-9 11.5-9 11.5Z" fill="#fff" />
        </g>
      )}
      {name === "spark" && (
        <g>
          <circle cx="40" cy="42" r="28" fill="url(#si-soft)" stroke="#F7B6C8" />
          <path d="M40 18c1.4 12 5 17 18 22-13 5-16.6 10-18 22-1.4-12-5-17-18-22 13-5 16.6-10 18-22Z" fill="url(#si-pink)" />
          <path d="M62 10c.6 4 2 6 6 7-4 1-5.4 3-6 7-.6-4-2-6-6-7 4-1 5.4-3 6-7Z" fill="#F58AAE" />
          <path d="M16 58c.5 3 1.5 4.5 4.5 5.2-3 .8-4 2.2-4.5 5.3-.5-3.1-1.5-4.5-4.5-5.3 3-.7 4-2.2 4.5-5.2Z" fill="#F58AAE" />
        </g>
      )}
      {name === "bolt" && (
        <g>
          <circle cx="40" cy="40" r="30" fill="url(#si-soft)" stroke="#F7B6C8" />
          <path d="M40 16a24 24 0 1 1-17 7" stroke="#F7B6C8" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="4 6" />
          <path d="M44 18 26 44h13l-4 18 19-27H41l3-17Z" fill="url(#si-pink)" />
          <path d="M44 18 26 44h8l10-26Z" fill="#fff" opacity=".25" />
        </g>
      )}
    </svg>
  );
}
