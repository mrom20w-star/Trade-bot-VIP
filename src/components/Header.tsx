import React from 'react';
import { OFFICIAL_LINKS, PLATFORMS, SupportedPlatform } from '../types/trading';
import { soundEffects } from '../utils/audio';
import { TradeBotLogo } from './TradeBotLogo';
import {
  Youtube,
  Volume2,
  VolumeX,
  Flame,
  ExternalLink,
} from 'lucide-react';

interface Props {
  selectedPlatform: SupportedPlatform;
  onSelectPlatform: (platform: SupportedPlatform) => void;
}

export const Header: React.FC<Props> = ({
  selectedPlatform,
  onSelectPlatform,
}) => {
  const [soundOn, setSoundOn] = React.useState(true);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundEffects.enabled = next;
    if (next) soundEffects.playTick();
  };

  const platform = PLATFORMS[selectedPlatform];

  return (
    <header className="sticky top-0 z-40 bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800">
      {/* Top breaking news / launch bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-rose-950 border-b border-cyan-500/20 px-3 py-1.5 text-xs text-center text-slate-200 flex items-center justify-center gap-2 overflow-hidden">
        <span className="flex items-center gap-1 font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-full text-[11px] animate-pulse">
          <Flame size={12} /> انطلاق رسمي!
        </span>
        <span className="truncate">
          نظام التوقعات المباشر لمنصتي <b>Quotex</b> و <b>ExpertOption</b> • بدقة تتجاوز 96%
        </span>
        <a
          href={OFFICIAL_LINKS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 font-bold underline hidden sm:inline"
        >
          قناة اليوتيوب
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name (In RTL, logo is on the right of the name) */}
        <div className="flex items-center gap-3">
          <TradeBotLogo size={46} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl text-white tracking-wider">
                Trade bot <span className="text-cyan-400">VIP</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> مباشر
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              البوت الذكي للتوقعات اللحظية لـ Quotex & ExpertOption
            </p>
          </div>
        </div>

        {/* Platform Indicator Toggle in Header */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              onSelectPlatform('quotex');
              soundEffects.playTick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedPlatform === 'quotex'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Quotex</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectPlatform('expertoption');
              soundEffects.playTick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedPlatform === 'expertoption'
                ? 'bg-sky-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>ExpertOption</span>
          </button>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2">
          {/* YouTube Channel Button */}
          <a
            href={OFFICIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm"
          >
            <Youtube size={15} />
            <span className="hidden sm:inline">يوتيوب</span>
          </a>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? 'كتم الصوت' : 'تشغيل الصوت'}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            {soundOn ? <Volume2 size={18} className="text-cyan-400" /> : <VolumeX size={18} />}
          </button>

          {/* Active Platform Direct Link */}
          <a
            href={platform.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3.5 sm:px-4 py-2 text-slate-950 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all shadow-lg ${
              selectedPlatform === 'quotex'
                ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20'
                : 'bg-sky-400 hover:bg-sky-300 shadow-sky-500/20'
            }`}
          >
            <span>دخول {platform.name}</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </header>
  );
};
