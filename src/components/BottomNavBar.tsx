import React from 'react';
import { Home, Users, Calendar, Wallet, HeartHandshake } from 'lucide-react';

export type TabType = 'beranda' | 'pohon' | 'anggota' | 'agenda' | 'kas' | 'iuran' | 'pengaturan';

interface BottomNavBarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenMoreMenu?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <nav className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-1 py-1.5 pb-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] shrink-0">
      <div className="grid grid-cols-6 items-center max-w-md mx-auto text-center">
        {/* 1. Beranda */}
        <button
          onClick={() => onSelectTab('beranda')}
          className={`flex flex-col items-center justify-center py-1 px-0.5 transition-colors relative ${
            activeTab === 'beranda' ? 'text-[#1e5631]' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="Beranda"
        >
          <Home size={20} className={activeTab === 'beranda' ? 'stroke-[2.4] fill-[#1e5631]/10' : 'stroke-[1.8]'} />
          <span className="text-[10px] font-medium mt-1 leading-tight truncate w-full">Beranda</span>
          {activeTab === 'beranda' && (
            <span className="w-5 h-0.5 bg-[#1e5631] rounded-full mt-0.5"></span>
          )}
        </button>

        {/* 2. Pohon Silsilah */}
        <button
          onClick={() => onSelectTab('pohon')}
          className={`flex flex-col items-center justify-center py-1 px-0.5 transition-colors relative ${
            activeTab === 'pohon' ? 'text-[#1e5631]' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="Pohon silsilah"
        >
          <svg
            className={`w-5 h-5 ${
              activeTab === 'pohon' ? 'text-[#1e5631]' : 'text-slate-400'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={activeTab === 'pohon' ? '2.4' : '1.8'}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22v-7" />
            <path d="M9 15h6" />
            <path d="M12 8a5 5 0 0 0-5 5c0 .6.1 1.2.3 1.7" />
            <path d="M12 8a5 5 0 0 1 5 5c0 .6-.1 1.2-.3 1.7" />
            <circle cx="12" cy="5" r="3" />
            <circle cx="6" cy="14" r="2.5" />
            <circle cx="18" cy="14" r="2.5" />
          </svg>
          <span className="text-[10px] font-medium mt-1 leading-tight truncate w-full">Pohon silsilah</span>
          {activeTab === 'pohon' && (
            <span className="w-5 h-0.5 bg-[#1e5631] rounded-full mt-0.5"></span>
          )}
        </button>

        {/* 3. Anggota */}
        <button
          onClick={() => onSelectTab('anggota')}
          className={`flex flex-col items-center justify-center py-1 px-0.5 transition-colors relative ${
            activeTab === 'anggota' ? 'text-[#1e5631]' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="Anggota"
        >
          <Users size={20} className={activeTab === 'anggota' ? 'stroke-[2.4] fill-[#1e5631]/10' : 'stroke-[1.8]'} />
          <span className="text-[10px] font-medium mt-1 leading-tight truncate w-full">Anggota</span>
          {activeTab === 'anggota' && (
            <span className="w-5 h-0.5 bg-[#1e5631] rounded-full mt-0.5"></span>
          )}
        </button>

        {/* 4. Agenda */}
        <button
          onClick={() => onSelectTab('agenda')}
          className={`flex flex-col items-center justify-center py-1 px-0.5 transition-colors relative ${
            activeTab === 'agenda' ? 'text-[#1e5631]' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="Agenda"
        >
          <Calendar size={20} className={activeTab === 'agenda' ? 'stroke-[2.4] fill-[#1e5631]/10' : 'stroke-[1.8]'} />
          <span className="text-[10px] font-medium mt-1 leading-tight truncate w-full">Agenda</span>
          {activeTab === 'agenda' && (
            <span className="w-5 h-0.5 bg-[#1e5631] rounded-full mt-0.5"></span>
          )}
        </button>

        {/* 5. Kas */}
        <button
          onClick={() => onSelectTab('kas')}
          className={`flex flex-col items-center justify-center py-1 px-0.5 transition-colors relative ${
            activeTab === 'kas' ? 'text-[#1e5631]' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="Kas"
        >
          <Wallet size={20} className={activeTab === 'kas' ? 'stroke-[2.4] fill-[#1e5631]/10' : 'stroke-[1.8]'} />
          <span className="text-[10px] font-medium mt-1 leading-tight truncate w-full">Kas</span>
          {activeTab === 'kas' && (
            <span className="w-5 h-0.5 bg-[#1e5631] rounded-full mt-0.5"></span>
          )}
        </button>

        {/* 6. Iuran */}
        <button
          onClick={() => onSelectTab('iuran')}
          className={`flex flex-col items-center justify-center py-1 px-0.5 transition-colors relative ${
            activeTab === 'iuran' ? 'text-[#1e5631]' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="Iuran"
        >
          <HeartHandshake size={20} className={activeTab === 'iuran' ? 'stroke-[2.4] fill-[#1e5631]/10' : 'stroke-[1.8]'} />
          <span className="text-[10px] font-medium mt-1 leading-tight truncate w-full">Iuran</span>
          {activeTab === 'iuran' && (
            <span className="w-5 h-0.5 bg-[#1e5631] rounded-full mt-0.5"></span>
          )}
        </button>
      </div>
    </nav>
  );
};
