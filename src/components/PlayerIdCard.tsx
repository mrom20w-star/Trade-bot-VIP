import React, { useState } from 'react';
import { PLATFORMS, SupportedPlatform } from '../types/trading';
import { soundEffects } from '../utils/audio';
import {
  User,
  CheckCircle,
  Edit2,
  ExternalLink,
  Sparkles,
  AlertCircle,
  Lock,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface Props {
  playerId: string;
  selectedPlatform: SupportedPlatform;
  onSelectPlatform: (platform: SupportedPlatform) => void;
  onSavePlayerId: (id: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const PlayerIdCard: React.FC<Props> = ({
  playerId,
  selectedPlatform,
  onSelectPlatform,
  onSavePlayerId,
  inputRef,
}) => {
  const isVerified = Boolean(playerId.trim());

  const [tempId, setTempId] = useState(playerId);
  const [isEditing, setIsEditing] = useState(!isVerified);
  const [error, setError] = useState('');

  const activePlatform = PLATFORMS[selectedPlatform];

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanId = tempId.trim();

    if (!cleanId) {
      setError(`يرجى إدخال Trader ID الخاص بك في منصة ${activePlatform.name} إجبارياً للبدء!`);
      soundEffects.playSellSignal();
      inputRef.current?.focus();
      return;
    }

    if (cleanId.length < 3) {
      setError('رقم المعرف قصير جداً، يرجى كتابة الـ ID الصحيح من داخل حسابك في المنصة');
      soundEffects.playSellSignal();
      return;
    }

    setError('');
    setIsEditing(false);
    onSavePlayerId(cleanId);
    soundEffects.playSuccess();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Platform Switcher (Quotex / ExpertOption) */}
      <div className="bg-[#0b1120]/90 border border-slate-800 rounded-3xl p-3 sm:p-4 shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-cyan-400" />
            <span className="text-xs font-bold text-slate-300">اختر المنصة المعتمدة:</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            المنصتان المعتمدتان فقط
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Quotex Button */}
          <button
            type="button"
            onClick={() => {
              onSelectPlatform('quotex');
              soundEffects.playTick();
            }}
            className={`p-3.5 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
              selectedPlatform === 'quotex'
                ? 'bg-gradient-to-r from-emerald-950/80 to-slate-900 border-emerald-400 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40 text-white'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs font-mono shrink-0 shadow-inner ${
                  selectedPlatform === 'quotex'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                QX
              </div>
              <div>
                <div className="font-black text-sm text-white">Quotex</div>
                <div className="text-[10px] text-slate-400">عائد حتى 98%</div>
              </div>
            </div>
            {selectedPlatform === 'quotex' && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          {/* ExpertOption Button */}
          <button
            type="button"
            onClick={() => {
              onSelectPlatform('expertoption');
              soundEffects.playTick();
            }}
            className={`p-3.5 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
              selectedPlatform === 'expertoption'
                ? 'bg-gradient-to-r from-sky-950/80 to-slate-900 border-sky-400 shadow-lg shadow-sky-500/20 ring-1 ring-sky-400/40 text-white'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs font-mono shrink-0 shadow-inner ${
                  selectedPlatform === 'expertoption'
                    ? 'bg-sky-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                EO
              </div>
              <div>
                <div className="font-black text-sm text-white">ExpertOption</div>
                <div className="text-[10px] text-slate-400">عائد حتى 95%</div>
              </div>
            </div>
            {selectedPlatform === 'expertoption' && (
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Trader ID Card (Mandatory Connection) */}
      <div className="bg-[#0b1120] border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* State 1: Active Verified State */}
        {!isEditing && isVerified ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/30 shrink-0">
                <User size={26} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">الحساب مربوط على {activePlatform.name}:</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle size={12} /> تم التحقق بنجاح
                  </span>
                </div>

                <div className="text-xl sm:text-2xl font-black font-mono text-cyan-300 tracking-wider">
                  #{playerId}
                </div>

                <p className="text-[11px] text-emerald-400 font-medium">
                  ✓ تم ربط الـ ID بنجاح • نظام التوقعات مفعل وجاهز للبدء
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setTempId(playerId);
                setIsEditing(true);
                soundEffects.playTick();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0"
            >
              <Edit2 size={13} />
              <span>تعديل Trader ID</span>
            </button>
          </div>
        ) : (
          /* State 2: Input Form for Trader ID */
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5 text-white font-black text-base sm:text-lg">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Lock size={18} />
                </div>
                <span>ربط معرف اللاعب Trader ID (إجباري قبل البدء)</span>
              </div>

              <span className="text-[11px] text-rose-400 font-bold bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20 flex items-center gap-1">
                <AlertCircle size={12} /> إجباري للدخول
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              لن تتمكن من بدء التوقعات أو استقبال إشارات الصعود والهبوط حتى تقوم بربط <b className="text-cyan-400 font-mono font-bold">Trader ID</b> الخاص بحسابك في منصة <b className="text-white font-bold">{activePlatform.name}</b>.
            </p>

            {/* Field: Trader ID */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-cyan-400" />
                  <span>Trader ID على منصة {activePlatform.name}:</span>
                </span>
                <span className="text-[10px] text-cyan-400 font-mono">معرف الحساب من داخل المنصة</span>
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={tempId}
                    onChange={(e) => {
                      setTempId(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder={`أدخل Trader ID الخاص بك في ${activePlatform.name} (مثال: 8492015)...`}
                    className="w-full py-3.5 px-4 pr-11 bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl text-white font-mono text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-right"
                    dir="ltr"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs select-none">
                    ID#
                  </span>
                </div>

                <button
                  type="submit"
                  className="py-3.5 px-6 rounded-xl font-black text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 hover:brightness-110 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all shrink-0"
                >
                  <Sparkles size={16} />
                  <span>تأكيد وربط الـ ID</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Helper links to open Quotex or ExpertOption */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 border-t border-slate-800">
              <div className="flex items-center gap-1.5">
                <span>ليس لديك حساب على {activePlatform.name}؟</span>
                <a
                  href={activePlatform.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-bold underline flex items-center gap-0.5"
                >
                  <span>سجل الآن للحصول على Trader ID</span>
                  <ExternalLink size={11} />
                </a>
              </div>

              <span className="text-slate-400">
                منصة {activePlatform.name} • تنفيذ فوري
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
