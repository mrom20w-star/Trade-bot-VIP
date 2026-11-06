export type SignalType = 'BUY' | 'SELL';
export type SupportedPlatform = 'quotex' | 'expertoption';

export interface PlatformConfig {
  id: SupportedPlatform;
  name: string;
  badge: string;
  tagline: string;
  color: string;
  borderColor: string;
  bgGradient: string;
  registerUrl: string;
  loginUrl: string;
  logoText: string;
  payoutMax: number;
}

export const PLATFORMS: Record<SupportedPlatform, PlatformConfig> = {
  quotex: {
    id: 'quotex',
    name: 'Quotex',
    badge: 'المنصة الرسمية #1',
    tagline: 'منصة التداول الرقمي السريعة مع تنفيذ فوري للصفقات',
    color: '#00E676',
    borderColor: 'border-emerald-500/50',
    bgGradient: 'from-emerald-950/60 via-slate-900 to-[#080d1a]',
    registerUrl: 'https://quotex.com',
    loginUrl: 'https://quotex.com',
    logoText: 'QX',
    payoutMax: 98,
  },
  expertoption: {
    id: 'expertoption',
    name: 'ExpertOption',
    badge: 'المنصة العالمية المعتمدة',
    tagline: 'تداول الخيارات الثنائية والعملات بدقة فائقة ورسوم بيانية مباشرة',
    color: '#38BDF8',
    borderColor: 'border-sky-500/50',
    bgGradient: 'from-sky-950/60 via-slate-900 to-[#080d1a]',
    registerUrl: 'https://expertoption.com',
    loginUrl: 'https://expertoption.com',
    logoText: 'EO',
    payoutMax: 95,
  },
};

export interface AssetPair {
  id: string;
  name: string;
  category: 'Forex' | 'Crypto' | 'Commodities' | 'OTC';
  basePrice: number;
  decimals: number;
  payoutPercent: number; // e.g. 92%
  volatility: 'منخفضة' | 'متوسطة' | 'عالية';
  icon: string;
}

export interface TradingSignal {
  id: string;
  pairId: string;
  pairName: string;
  type: SignalType;
  entryPrice: number;
  timeframe: string;
  accuracy: number;
  timestamp: number;
  status: 'ACTIVE' | 'EXPIRED' | 'WIN';
}

export const ASSET_PAIRS: AssetPair[] = [
  {
    id: 'EURUSD',
    name: 'EUR / USD',
    category: 'Forex',
    basePrice: 1.08420,
    decimals: 5,
    payoutPercent: 94,
    volatility: 'متوسطة',
    icon: '💶',
  },
  {
    id: 'EURUSD_OTC',
    name: 'EUR / USD (OTC VIP)',
    category: 'OTC',
    basePrice: 1.08510,
    decimals: 5,
    payoutPercent: 98,
    volatility: 'عالية',
    icon: '⚡',
  },
  {
    id: 'BTCUSDT',
    name: 'BTC / USDT',
    category: 'Crypto',
    basePrice: 68420.0,
    decimals: 2,
    payoutPercent: 91,
    volatility: 'عالية',
    icon: '₿',
  },
  {
    id: 'XAUUSD',
    name: 'الذهب XAU / USD',
    category: 'Commodities',
    basePrice: 2742.80,
    decimals: 2,
    payoutPercent: 95,
    volatility: 'عالية',
    icon: '🥇',
  },
  {
    id: 'GBPUSD',
    name: 'GBP / USD',
    category: 'Forex',
    basePrice: 1.29850,
    decimals: 5,
    payoutPercent: 92,
    volatility: 'متوسطة',
    icon: '💷',
  },
  {
    id: 'USDJPY',
    name: 'USD / JPY',
    category: 'Forex',
    basePrice: 152.340,
    decimals: 3,
    payoutPercent: 89,
    volatility: 'منخفضة',
    icon: '💴',
  },
  {
    id: 'ETHUSDT',
    name: 'ETH / USDT',
    category: 'Crypto',
    basePrice: 2580.40,
    decimals: 2,
    payoutPercent: 90,
    volatility: 'عالية',
    icon: '♦️',
  },
];

export const OFFICIAL_LINKS = {
  youtube: 'https://youtube.com/@1xmegatrading',
  quotex: 'https://quotex.com',
  expertOption: 'https://expertoption.com',
  launchTime: 'اليوم الساعة 4:00 مساءً بتوقيت القاهرة',
};
