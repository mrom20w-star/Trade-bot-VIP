import React, { useState, useEffect, useRef } from 'react';
import { AssetPair, ASSET_PAIRS, PLATFORMS, SupportedPlatform } from './types/trading';
import { Header } from './components/Header';
import { PlayerIdCard } from './components/PlayerIdCard';
import { TechnicalIndicators } from './components/TechnicalIndicators';
import { PurePredictor } from './components/PurePredictor';
import { TradeBotLogo } from './components/TradeBotLogo';
import {
  Youtube,
  ShieldAlert,
} from 'lucide-react';

export default function App() {
  const [playerId, setPlayerId] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<SupportedPlatform>('quotex');
  const [selectedPair, setSelectedPair] = useState<AssetPair>(ASSET_PAIRS[0]);
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});
  const [activeDirection, setActiveDirection] = useState<'UP' | 'DOWN' | null>(null);

  const traderIdInputRef = useRef<HTMLInputElement | null>(null);

  // Load saved credentials from localStorage
  useEffect(() => {
    try {
      const savedId = localStorage.getItem('1xmega_player_id');
      if (savedId) {
        setPlayerId(savedId);
      }

      const savedPlatform = localStorage.getItem('1xmega_selected_platform');
      if (savedPlatform === 'quotex' || savedPlatform === 'expertoption') {
        setSelectedPlatform(savedPlatform);
      }
    } catch {
      // LocalStorage fallback
    }

    // Initialize asset prices
    const initialPrices: Record<string, number> = {};
    ASSET_PAIRS.forEach((p) => {
      initialPrices[p.id] = p.basePrice;
    });
    setLivePrices(initialPrices);
  }, []);

  // Natural price ticker interval
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrices((prev) => {
        const next = { ...prev };
        ASSET_PAIRS.forEach((p) => {
          const current = next[p.id] || p.basePrice;
          const volMultiplier = p.volatility === 'عالية' ? 0.0006 : 0.0002;
          const delta = (Math.random() - 0.49) * p.basePrice * volMultiplier;
          next[p.id] = Number((current + delta).toFixed(p.decimals));
        });
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const isAccountVerified = Boolean(playerId.trim());

  const handleSelectPlatform = (platform: SupportedPlatform) => {
    setSelectedPlatform(platform);
    try {
      localStorage.setItem('1xmega_selected_platform', platform);
    } catch {
      // LocalStorage fallback
    }
  };

  const handleSavePlayerId = (newId: string) => {
    setPlayerId(newId);
    try {
      localStorage.setItem('1xmega_player_id', newId);
    } catch {
      // LocalStorage fallback
    }
  };

  const handleRequestCredentialsFocus = () => {
    traderIdInputRef.current?.focus();
    traderIdInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const currentPrice = livePrices[selectedPair.id] || selectedPair.basePrice;
  const platform = PLATFORMS[selectedPlatform];

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-['Cairo',sans-serif] selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Main Header without any telegram */}
      <Header
        selectedPlatform={selectedPlatform}
        onSelectPlatform={handleSelectPlatform}
      />

      {/* Modern Top Hero Status Strip */}
      <div className="bg-gradient-to-r from-[#0c1529] via-[#091122] to-[#070b16] border-b border-slate-800/80 px-4 py-2.5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-bold text-white text-xs sm:text-sm">
              بوت التداول الذكي Trade bot VIP متصل
            </span>
            <span className="text-slate-400 hidden sm:inline">
              | المنصتان المعتمدتان: Quotex & ExpertOption
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span
              className={`font-bold px-3 py-1 rounded-xl border flex items-center gap-1.5 text-xs ${
                selectedPlatform === 'quotex'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : 'bg-sky-500/15 text-sky-400 border-sky-500/30'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>المنصة المختارة: {platform.name}</span>
            </span>

            <a
              href={platform.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline font-bold"
            >
              فتح {platform.name}
            </a>
          </div>
        </div>
      </div>

      {/* Main Clean Center Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-5 flex flex-col justify-center">
        {/* Required Trader ID Card (Mandatory before starting) */}
        <PlayerIdCard
          playerId={playerId}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={handleSelectPlatform}
          onSavePlayerId={handleSavePlayerId}
          inputRef={traderIdInputRef}
        />

        {/* Sleek Technical Indicators Panel (RSI, MACD, Bollinger, EMA) */}
        <TechnicalIndicators
          selectedPair={selectedPair}
          onSelectPair={setSelectedPair}
          selectedPlatform={selectedPlatform}
          livePrice={currentPrice}
          activeDirection={activeDirection}
        />

        {/* Pure Predictor Component (Start -> 10s wait -> UP/DOWN) */}
        <PurePredictor
          playerId={playerId}
          isAccountVerified={isAccountVerified}
          onRequestCredentialsFocus={handleRequestCredentialsFocus}
          selectedPair={selectedPair}
          selectedPlatform={selectedPlatform}
          livePrice={currentPrice}
          onDirectionChange={setActiveDirection}
        />
      </main>

      {/* Official Footer */}
      <footer className="mt-auto bg-[#040711] border-t border-slate-800/80 py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <TradeBotLogo size={38} />
            <div>
              <div className="font-bold text-white text-sm">منظومة Trade bot VIP الرسمية</div>
              <p className="text-[11px] text-slate-500">
                منظومة التوقعات الرقمية الذكية لمنصتي Quotex و ExpertOption
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://quotex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
            >
              <span>منصة Quotex</span>
            </a>

            <a
              href="https://expertoption.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-bold"
            >
              <span>منصة ExpertOption</span>
            </a>

            <a
              href="https://youtube.com/@1xmegatrading"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-bold"
            >
              <Youtube size={15} />
              <span>قناة اليوتيوب</span>
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <ShieldAlert size={14} className="text-amber-500/70" />
            <span>تداول بمسؤولية وفقاً لإدارة رأس المال</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
