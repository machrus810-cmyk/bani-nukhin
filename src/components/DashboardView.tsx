import React from 'react';
import { 
  Menu, 
  ChevronRight, 
  Users, 
  Calendar, 
  Wallet, 
  HeartHandshake, 
  Settings, 
  Home as HomeIcon,
  CircleDollarSign,
  UserPlus,
  FileEdit,
  TreeDeciduous
} from 'lucide-react';
import { TabType } from './BottomNavBar';
import { ActivityLog } from '../types';

interface DashboardViewProps {
  onNavigate: (tab: TabType) => void;
  onOpenDrawer: () => void;
  activities: ActivityLog[];
  totalMembersCount: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenDrawer,
  activities,
  totalMembersCount,
}) => {
  return (
    <div className="min-h-full pb-8 bg-[#F8F6F0]">
      {/* Top Emerald Forest Header with Hero Illustration */}
      <div className="relative bg-gradient-to-b from-[#133827] via-[#1a4a34] to-[#245e43] text-white pt-3 pb-14 px-4 overflow-hidden">
        {/* Background tree artistic graphic seamlessly positioned on right */}
        <div className="absolute right-0 top-0 w-2/3 h-full pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
          <img
            src="/src/assets/images/hero_family_tree_1790816083612.jpg"
            alt="Family Tree Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#133827] via-transparent to-transparent"></div>
        </div>

        {/* Top bar with Hamburger menu */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <button
            onClick={onOpenDrawer}
            className="p-2 -ml-1 text-white/90 hover:text-white active:scale-95 transition-transform"
            aria-label="Menu navigasi"
          >
            <Menu size={26} className="stroke-[2.2]" />
          </button>
        </div>

        {/* Brand Lockup: Logo + Title */}
        <div className="relative z-10 flex items-start gap-3 mb-6">
          {/* Logo Badge: Green Circle with Family Tree Icon */}
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-2 flex items-center justify-center shrink-0 shadow-inner">
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-emerald-200">
              <path d="M24 6C20 6 16 9 16 13C16 14.5 16.5 16 17.5 17.2C14 18 11.5 21 11.5 25C11.5 29.5 15 33 19.5 33C20 33 20.6 32.9 21.1 32.8C22.2 35.8 25 38 28.5 38C33 38 36.5 34.5 36.5 30C36.5 29.2 36.4 28.5 36.1 27.8C37.8 26.5 39 24.4 39 22C39 17.6 35.4 14 31 14C30.6 14 30.2 14 29.8 14.1C28.8 9.5 24 6 24 6Z" fill="#a7f3d0" fillOpacity="0.4" stroke="#a7f3d0" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M24 22V42M24 28L18 36M24 30L30 36" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="24" cy="20" r="3" fill="#ffffff" />
              <circle cx="18" cy="28" r="2.5" fill="#fde68a" />
              <circle cx="30" cy="28" r="2.5" fill="#fde68a" />
            </svg>
          </div>

          <div className="pt-0.5">
            <h1 className="text-[22px] font-bold tracking-tight text-white leading-tight">
              Silsilah Keluarga
            </h1>
            <p className="text-[13px] text-emerald-100/90 font-medium flex items-center gap-1.5">
              <span>Besar Kita, Satu Keluarga</span>
              <span className="inline-block w-8 h-[2px] bg-gradient-to-r from-amber-300 to-transparent rounded-full ml-1"></span>
            </p>
          </div>
        </div>

        {/* User Greeting Card (Halo, Machrus) */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-lg shadow-black/10">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-300/80 shrink-0 bg-emerald-900/50">
            <img
              src="/src/assets/images/machrus_avatar_1790816108650.jpg"
              alt="Machrus"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback avatar if asset fails
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
              }}
            />
          </div>
          <div>
            <div className="text-white font-bold text-base leading-tight">Halo, Machrus</div>
            <div className="text-xs text-emerald-100/85 font-normal mt-0.5 leading-snug">
              Jaga silsilah, lestarikan warisan keluarga Bani H. Nukhin.
            </div>
          </div>
        </div>
      </div>

      {/* Main Body with Overlapping Rounded Card Style */}
      <div className="-mt-8 relative z-20 px-4">
        {/* 6 Feature Menu Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* 1. Pohon Silsilah */}
          <button
            onClick={() => onNavigate('pohon')}
            className="bg-white rounded-2xl p-3.5 text-left shadow-sm border border-stone-100 hover:shadow-md transition-all active:scale-[0.98] group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TreeDeciduous size={24} className="stroke-[2.2]" />
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors mt-1" />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-[14px] leading-tight">Pohon Silsilah</div>
              <div className="text-[11px] text-slate-500 leading-tight mt-1 line-clamp-2">
                Lihat dan telusuri pohon keluarga besar
              </div>
            </div>
          </button>

          {/* 2. Anggota Keluarga */}
          <button
            onClick={() => onNavigate('anggota')}
            className="bg-white rounded-2xl p-3.5 text-left shadow-sm border border-stone-100 hover:shadow-md transition-all active:scale-[0.98] group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users size={22} className="stroke-[2.2]" />
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors mt-1" />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-[14px] leading-tight">Anggota Keluarga</div>
              <div className="text-[11px] text-slate-500 leading-tight mt-1 line-clamp-2">
                Data lengkap seluruh anggota
              </div>
            </div>
          </button>

          {/* 3. Agenda Keluarga */}
          <button
            onClick={() => onNavigate('agenda')}
            className="bg-white rounded-2xl p-3.5 text-left shadow-sm border border-stone-100 hover:shadow-md transition-all active:scale-[0.98] group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Calendar size={22} className="stroke-[2.2]" />
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-amber-600 transition-colors mt-1" />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-[14px] leading-tight">Agenda Keluarga</div>
              <div className="text-[11px] text-slate-500 leading-tight mt-1 line-clamp-2">
                Jadwal acara & pertemuan keluarga
              </div>
            </div>
          </button>

          {/* 4. Uang Kas */}
          <button
            onClick={() => onNavigate('kas')}
            className="bg-white rounded-2xl p-3.5 text-left shadow-sm border border-stone-100 hover:shadow-md transition-all active:scale-[0.98] group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <div className="flex items-center -space-x-1">
                  <CircleDollarSign size={22} className="stroke-[2.2]" />
                  <span className="text-[10px] font-bold text-purple-700 -ml-1">Rp</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-purple-600 transition-colors mt-1" />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-[14px] leading-tight">Uang Kas</div>
              <div className="text-[11px] text-slate-500 leading-tight mt-1 line-clamp-2">
                Kelola kas keluarga secara transparan
              </div>
            </div>
          </button>

          {/* 5. Iuran */}
          <button
            onClick={() => onNavigate('iuran')}
            className="bg-white rounded-2xl p-3.5 text-left shadow-sm border border-stone-100 hover:shadow-md transition-all active:scale-[0.98] group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <HeartHandshake size={22} className="stroke-[2.2]" />
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-teal-600 transition-colors mt-1" />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-[14px] leading-tight">Iuran</div>
              <div className="text-[11px] text-slate-500 leading-tight mt-1 line-clamp-2">
                Catat dan pantau iuran keluarga
              </div>
            </div>
          </button>

          {/* 6. Pengaturan */}
          <button
            onClick={() => onNavigate('pengaturan')}
            className="bg-white rounded-2xl p-3.5 text-left shadow-sm border border-stone-100 hover:shadow-md transition-all active:scale-[0.98] group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                <Settings size={22} className="stroke-[2.2]" />
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-pink-600 transition-colors mt-1" />
            </div>
            <div>
              <div className="font-bold text-slate-800 text-[14px] leading-tight">Pengaturan</div>
              <div className="text-[11px] text-slate-500 leading-tight mt-1 line-clamp-2">
                Kelola data & preferensi aplikasi
              </div>
            </div>
          </button>
        </div>

        {/* Section: Ringkasan Keluarga */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 mb-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                <Users size={16} />
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-slate-800 leading-tight">Ringkasan Keluarga</h2>
                <p className="text-[11px] text-slate-500 leading-tight">Informasi singkat tentang keluarga besar kita</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('anggota')}
              className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700 flex items-center gap-0.5 bg-slate-50 px-2 py-1 rounded-full border border-slate-100"
            >
              Lihat Semua <ChevronRight size={12} />
            </button>
          </div>

          {/* 4 Metrics in a row */}
          <div className="grid grid-cols-4 gap-2">
            {/* Stat 1 */}
            <div 
              onClick={() => onNavigate('anggota')}
              className="bg-stone-50/70 hover:bg-stone-100/80 cursor-pointer rounded-xl p-2 text-center transition-colors border border-stone-100"
            >
              <div className="w-7 h-7 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1">
                <Users size={14} />
              </div>
              <div className="font-bold text-slate-800 text-sm">{totalMembersCount || 128}</div>
              <div className="text-[9px] text-slate-500 font-medium leading-tight mt-0.5">Total Anggota</div>
            </div>

            {/* Stat 2 */}
            <div 
              onClick={() => onNavigate('pohon')}
              className="bg-stone-50/70 hover:bg-stone-100/80 cursor-pointer rounded-xl p-2 text-center transition-colors border border-stone-100"
            >
              <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
                <HomeIcon size={14} />
              </div>
              <div className="font-bold text-slate-800 text-sm">5</div>
              <div className="text-[9px] text-slate-500 font-medium leading-tight mt-0.5">Generasi</div>
            </div>

            {/* Stat 3 */}
            <div 
              onClick={() => onNavigate('agenda')}
              className="bg-stone-50/70 hover:bg-stone-100/80 cursor-pointer rounded-xl p-2 text-center transition-colors border border-stone-100"
            >
              <div className="w-7 h-7 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-1">
                <Calendar size={14} />
              </div>
              <div className="font-bold text-slate-800 text-sm">12</div>
              <div className="text-[9px] text-slate-500 font-medium leading-tight mt-0.5">Agenda Mendatang</div>
            </div>

            {/* Stat 4 */}
            <div 
              onClick={() => onNavigate('kas')}
              className="bg-stone-50/70 hover:bg-stone-100/80 cursor-pointer rounded-xl p-2 text-center transition-colors border border-stone-100"
            >
              <div className="w-7 h-7 mx-auto rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-1">
                <span className="text-[10px] font-bold">Rp</span>
              </div>
              <div className="font-bold text-slate-800 text-sm">8</div>
              <div className="text-[9px] text-slate-500 font-medium leading-tight mt-0.5">Transaksi Kas</div>
            </div>
          </div>
        </div>

        {/* Section: Aktivitas Terbaru */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-bold text-slate-800">Aktivitas Terbaru</h2>
            <button
              onClick={() => onNavigate('agenda')}
              className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700 flex items-center gap-0.5"
            >
              Lihat Semua <ChevronRight size={12} />
            </button>
          </div>

          <div className="space-y-3">
            {activities.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between py-1.5 border-b border-stone-100 last:border-none group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    act.iconType === 'user' ? 'bg-emerald-100 text-emerald-700' :
                    act.iconType === 'calendar' ? 'bg-blue-100 text-blue-700' :
                    act.iconType === 'cash' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {act.iconType === 'user' && <UserPlus size={15} />}
                    {act.iconType === 'calendar' && <Calendar size={15} />}
                    {act.iconType === 'cash' && <Wallet size={15} />}
                    {act.iconType === 'edit' && <FileEdit size={15} />}
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-slate-800 leading-tight">
                      {act.description}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{act.timeAgo}</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
