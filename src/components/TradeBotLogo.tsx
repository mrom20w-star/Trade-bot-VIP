import React from 'react';

interface Props {
  className?: string;
  size?: number;
}

export const TradeBotLogo: React.FC<Props> = ({ className = '', size = 44 }) => {
  return (
    <div
      className={`relative rounded-2xl flex items-center justify-center select-none shrink-0 shadow-lg shadow-cyan-500/20 group transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Glow Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500 via-emerald-400 to-blue-600 p-[1.5px]">
        <div className="w-full h-full bg-[#0a1122] rounded-[14px] flex items-center justify-center overflow-hidden relative">
          {/* Subtle Grid / Circuit backdrop */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:8px_8px]" />

          {/* SVG Bot & Candlestick Cyber Emblem */}
          <svg
            viewBox="0 0 100 100"
            className="w-[82%] h-[82%] relative z-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs for Linear Gradients */}
            <defs>
              <linearGradient id="botCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="botGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="goldVipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            {/* Hexagonal Shield Outline */}
            <polygon
              points="50,6 88,26 88,74 50,94 12,74 12,26"
              stroke="url(#botCyanGrad)"
              strokeWidth="3.5"
              strokeLinejoin="round"
              fill="#060c18"
              fillOpacity="0.8"
            />

            {/* Trading Candlestick Bar Left (Green) */}
            <line x1="28" y1="36" x2="28" y2="64" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            <rect x="25" y="42" width="6" height="15" rx="1.5" fill="#10b981" />

            {/* Trading Candlestick Bar Right (Cyan) */}
            <line x1="72" y1="30" x2="72" y2="60" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <rect x="69" y="35" width="6" height="16" rx="1.5" fill="#38bdf8" />

            {/* Robot Head / Visor Center */}
            <rect x="36" y="34" width="28" height="24" rx="6" fill="#0d1b33" stroke="url(#botCyanGrad)" strokeWidth="2.5" />
            
            {/* Antenna with pulsing energy tip */}
            <line x1="50" y1="34" x2="50" y2="24" stroke="url(#botCyanGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="22" r="3" fill="#38bdf8" className="animate-pulse" />

            {/* Visor glowing eyes / pulse line */}
            <rect x="41" y="42" width="18" height="7" rx="3.5" fill="#0284c7" />
            <circle cx="45" cy="45.5" r="2" fill="#a7f3d0" />
            <circle cx="55" cy="45.5" r="2" fill="#a7f3d0" />

            {/* Upward Trading Growth Arrow going through */}
            <path
              d="M32 70 L48 54 L58 61 L70 46"
              stroke="url(#botGreenGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polygon points="68,43 74,44 71,50" fill="#34d399" />

            {/* VIP Golden Badge ribbon at bottom of shield */}
            <rect x="35" y="73" width="30" height="13" rx="4" fill="url(#goldVipGrad)" />
            <text
              x="50"
              y="82.5"
              fill="#0f172a"
              fontSize="8.5"
              fontWeight="900"
              fontFamily="monospace"
              textAnchor="middle"
              letterSpacing="0.5"
            >
              VIP
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};
