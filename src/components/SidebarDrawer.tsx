import React from 'react';
import { 
  X, 
  Home, 
  TreeDeciduous, 
  Users, 
  Calendar, 
  Wallet, 
  HeartHandshake, 
  Settings, 
  BookOpen,
  Share2
} from 'lucide-react';
import { TabType } from './BottomNavBar';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType) => void;
  activeTab: TabType;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  activeTab,
}) => {
  if (!isOpen) return null;

  const handleNav = (tab: TabType) => {
    onSelectTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer Container */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col justify-between animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="bg-gradient-to-br from-[#133827] to-[#1e5631] text-white p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 p-2 flex items-center justify-center">
                <TreeDeciduous size={22} className="text-emerald-200" />
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>
            <h2 className="font-bold text-base leading-tight">Bani H. Nukhin</h2>
            <p className="text-xs text-emerald-200/90 mt-0.5">Satu Keluarga, Satu Warisan</p>
          </div>

          {/* Navigation Items */}
          <div className="p-3 space-y-1">
            <button
              onClick={() => handleNav('beranda')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'beranda' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Home size={18} className={activeTab === 'beranda' ? 'text-emerald-700' : 'text-slate-400'} />
              <span>Beranda Dashboard</span>
            </button>

            <button
              onClick={() => handleNav('pohon')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'pohon' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <TreeDeciduous size={18} className={activeTab === 'pohon' ? 'text-emerald-700' : 'text-slate-400'} />
              <span>Pohon Silsilah</span>
            </button>

            <button
              onClick={() => handleNav('anggota')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'anggota' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Users size={18} className={activeTab === 'anggota' ? 'text-emerald-700' : 'text-slate-400'} />
              <span>Data Anggota Keluarga</span>
            </button>

            <button
              onClick={() => handleNav('agenda')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'agenda' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Calendar size={18} className={activeTab === 'agenda' ? 'text-emerald-700' : 'text-slate-400'} />
              <span>Agenda & Pertemuan</span>
            </button>

            <button
              onClick={() => handleNav('kas')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'kas' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Wallet size={18} className={activeTab === 'kas' ? 'text-emerald-700' : 'text-slate-400'} />
              <span>Uang Kas Keluarga</span>
            </button>

            <button
              onClick={() => handleNav('iuran')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'iuran' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <HeartHandshake size={18} className={activeTab === 'iuran' ? 'text-emerald-700' : 'text-slate-400'} />
              <span>Iuran Keluarga</span>
            </button>

            <div className="h-px bg-slate-100 my-2"></div>

            <button
              onClick={() => handleNav('pengaturan')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'pengaturan' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Settings size={18} className={activeTab === 'pengaturan' ? 'text-emerald-700' : 'text-slate-400'} />
              <span>Pengaturan & Info</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 bg-stone-50 text-[11px] text-slate-500">
          <p className="font-semibold text-slate-700">Keluarga Besar Bani H. Nukhin</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Aplikasi Silsilah & Keuangan Transparan</p>
        </div>
      </div>
    </div>
  );
};
