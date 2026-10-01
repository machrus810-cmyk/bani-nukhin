import React from 'react';
import { 
  Menu, 
  ChevronRight, 
  Users, 
  Calendar, 
  Wallet, 
  GitFork, 
  HeartPulse, 
  Flower2, 
  User, 
  Heart,
  ArrowUpRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { TabType } from './BottomNavBar';
import { ActivityLog, FamilyMember, CashTransaction, AgendaItem } from '../types';

interface DashboardViewProps {
  onNavigate: (tab: TabType) => void;
  onOpenDrawer: () => void;
  activities: ActivityLog[];
  members: FamilyMember[];
  transactions: CashTransaction[];
  agendas: AgendaItem[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenDrawer,
  activities,
  members,
  transactions,
  agendas,
}) => {
  // Calculations for dynamic stats
  const totalIncome = transactions
    .filter((t) => t.type === 'in')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'out')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  const totalMembers = members.length;
  const uniqueGenerations = new Set(members.map((m) => m.generation)).size;

  const maleMembers = members.filter((m) => m.gender === 'male');
  const femaleMembers = members.filter((m) => m.gender === 'female');
  const maleCount = maleMembers.length;
  const femaleCount = femaleMembers.length;
  const malePercentage = totalMembers > 0 ? Math.round((maleCount / totalMembers) * 100) : 0;
  const femalePercentage = totalMembers > 0 ? Math.round((femaleCount / totalMembers) * 100) : 0;

  const aliveCount = members.filter((m) => m.status === 'alive').length;
  const deceasedCount = members.filter((m) => m.status === 'deceased').length;

  // Nearest upcoming agenda
  const nearestAgenda = agendas.length > 0 ? agendas[0] : null;

  return (
    <div className="min-h-full pb-8 bg-[#F8F6F0]">
      {/* Top Emerald Forest Header with Hero Illustration */}
      <div className="relative bg-gradient-to-b from-[#133827] via-[#1a4a34] to-[#245e43] text-white pt-3.5 pb-10 px-4 overflow-hidden">
        {/* Background tree artistic graphic seamlessly positioned on right */}
        <div className="absolute right-0 top-0 w-3/4 h-full pointer-events-none opacity-50 mix-blend-screen overflow-hidden">
          <img
            src="/images/hero_family_tree.jpg"
            alt="Family Tree Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#133827] via-transparent to-transparent"></div>
        </div>

        {/* Top bar with Hamburger menu */}
        <div className="relative z-10 flex items-center justify-between mb-3">
          <button
            onClick={onOpenDrawer}
            className="p-2 -ml-1 text-white/90 hover:text-white active:scale-95 transition-transform"
            aria-label="Menu navigasi"
          >
            <Menu size={26} className="stroke-[2.2]" />
          </button>
        </div>

        {/* Brand Lockup: Logo + Title */}
        <div className="relative z-10 flex items-start gap-3 mb-2">
          {/* Logo Badge: Green Circle with Family Tree Icon */}
          <div className="w-13 h-13 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 p-2.5 flex items-center justify-center shrink-0 shadow-lg shadow-black/15">
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-emerald-200">
              <path d="M24 6C20 6 16 9 16 13C16 14.5 16.5 16 17.5 17.2C14 18 11.5 21 11.5 25C11.5 29.5 15 33 19.5 33C20 33 20.6 32.9 21.1 32.8C22.2 35.8 25 38 28.5 38C33 38 36.5 34.5 36.5 30C36.5 29.2 36.4 28.5 36.1 27.8C37.8 26.5 39 24.4 39 22C39 17.6 35.4 14 31 14C30.6 14 30.2 14 29.8 14.1C28.8 9.5 24 6 24 6Z" fill="#a7f3d0" fillOpacity="0.4" stroke="#a7f3d0" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M24 22V42M24 28L18 36M24 30L30 36" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="24" cy="20" r="3" fill="#ffffff" />
              <circle cx="18" cy="28" r="2.5" fill="#fde68a" />
              <circle cx="30" cy="28" r="2.5" fill="#fde68a" />
            </svg>
          </div>

          <div className="pt-0.5">
            <h1 className="text-[22px] font-extrabold tracking-tight text-white leading-tight">
              Silsilah Bani H. NUKHIN
            </h1>
            <p className="text-[13px] text-emerald-100/90 font-medium flex items-center gap-1.5 mt-0.5">
              <span>Mempererat Tali Persaudaraan</span>
              <span className="inline-block w-8 h-[2px] bg-gradient-to-r from-amber-300 to-transparent rounded-full ml-1"></span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Body with 8 Interactive Statistic Cards */}
      <div className="-mt-4 relative z-20 px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <Sparkles size={15} className="text-emerald-700" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Statistik & Informasi Keluarga
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Ketuk untuk detail</span>
        </div>

        {/* 8 Interactive Cards Grid (2 Columns) */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Card 1: Total Saldo */}
          <button
            onClick={() => onNavigate('kas')}
            className="group relative bg-white rounded-2xl p-3.5 text-left border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 active:scale-[0.97] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
                  <Wallet size={19} className="stroke-[2.2]" />
                </div>
                <div className="flex items-center gap-0.5 text-emerald-700 text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight size={15} />
                </div>
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Total Saldo
              </div>
              <div className="text-[15px] font-extrabold text-[#173e2a] leading-tight mt-1 truncate">
                Rp {totalBalance.toLocaleString('id-ID')}
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-500">
              <span className="text-emerald-700 font-medium">Buka Kas</span>
              <ChevronRight size={13} className="text-slate-400 group-hover:text-emerald-700" />
            </div>
          </button>

          {/* Card 2: Agenda Terdekat */}
          <button
            onClick={() => onNavigate('agenda')}
            className="group relative bg-white rounded-2xl p-3.5 text-left border border-amber-100 shadow-xs hover:shadow-md hover:border-amber-300 transition-all duration-200 active:scale-[0.97] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
                  <Calendar size={19} className="stroke-[2.2]" />
                </div>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Terdekat
                </span>
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Agenda Terdekat
              </div>
              <div className="text-[13px] font-bold text-slate-800 leading-snug mt-1 line-clamp-1">
                {nearestAgenda ? nearestAgenda.title : 'Tidak ada agenda'}
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-500">
              <span className="text-amber-700 font-medium truncate">
                {nearestAgenda ? nearestAgenda.dateTime : 'Lihat Jadwal'}
              </span>
              <ChevronRight size={13} className="text-slate-400 group-hover:text-amber-700 shrink-0 ml-1" />
            </div>
          </button>

          {/* Card 3: Total Anggota */}
          <button
            onClick={() => onNavigate('anggota')}
            className="group relative bg-white rounded-2xl p-3.5 text-left border border-blue-100 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 active:scale-[0.97] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shadow-xs">
                  <Users size={19} className="stroke-[2.2]" />
                </div>
                <div className="text-blue-700 group-hover:translate-x-0.5 transition-transform">
                  <ChevronRight size={16} />
                </div>
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Total Anggota
              </div>
              <div className="text-[17px] font-extrabold text-slate-800 leading-tight mt-1">
                {totalMembers} <span className="text-xs font-semibold text-slate-500">Orang</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-500">
              <span className="text-blue-700 font-medium">Semua Anggota</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            </div>
          </button>

          {/* Card 4: Total Generasi */}
          <button
            onClick={() => onNavigate('pohon')}
            className="group relative bg-white rounded-2xl p-3.5 text-left border border-teal-100 shadow-xs hover:shadow-md hover:border-teal-300 transition-all duration-200 active:scale-[0.97] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-teal-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shadow-xs">
                  <GitFork size={19} className="stroke-[2.2]" />
                </div>
                <div className="text-teal-700 group-hover:translate-x-0.5 transition-transform">
                  <ChevronRight size={16} />
                </div>
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Total Generasi
              </div>
              <div className="text-[17px] font-extrabold text-slate-800 leading-tight mt-1">
                {uniqueGenerations} <span className="text-xs font-semibold text-slate-500">Generasi</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-500">
              <span className="text-teal-700 font-medium">Bagan Silsilah</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            </div>
          </button>

          {/* Card 5: Laki-Laki */}
          <button
            onClick={() => onNavigate('anggota')}
            className="group relative bg-white rounded-2xl p-3.5 text-left border border-sky-100 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 active:scale-[0.97] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-sky-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-xs">
                  <User size={19} className="stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200/60">
                  {malePercentage}%
                </span>
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Laki-Laki
              </div>
              <div className="text-[17px] font-extrabold text-sky-900 leading-tight mt-1">
                {maleCount} <span className="text-xs font-semibold text-slate-500">Orang</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-500">
              <span className="text-sky-700 font-medium">Putra & Cucu</span>
              <ChevronRight size={13} className="text-slate-400 group-hover:text-sky-700" />
            </div>
          </button>

          {/* Card 6: Perempuan */}
          <button
            onClick={() => onNavigate('anggota')}
            className="group relative bg-white rounded-2xl p-3.5 text-left border border-rose-100 shadow-xs hover:shadow-md hover:border-rose-300 transition-all duration-200 active:scale-[0.97] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-rose-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shadow-xs">
                  <Heart size={19} className="stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200/60">
                  {femalePercentage}%
                </span>
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Perempuan
              </div>
              <div className="text-[17px] font-extrabold text-rose-900 leading-tight mt-1">
                {femaleCount} <span className="text-xs font-semibold text-slate-500">Orang</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-500">
              <span className="text-rose-700 font-medium">Putri & Cucu</span>
              <ChevronRight size={13} className="text-slate-400 group-hover:text-rose-700" />
            </div>
          </button>

          {/* Card 7: Hidup */}
          <button
            onClick={() => onNavigate('anggota')}
            className="group relative bg-white rounded-2xl p-3.5 text-left border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 active:scale-[0.97] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                  <HeartPulse size={19} className="stroke-[2.2]" />
                </div>
                <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] font-bold text-emerald-800">Aktif</span>
                </div>
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Hidup
              </div>
              <div className="text-[17px] font-extrabold text-emerald-900 leading-tight mt-1">
                {aliveCount} <span className="text-xs font-semibold text-slate-500">Orang</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-500">
              <span className="text-emerald-700 font-medium">Sehat Walafiat</span>
              <ChevronRight size={13} className="text-slate-400 group-hover:text-emerald-700" />
            </div>
          </button>

          {/* Card 8: Meninggal */}
          <button
            onClick={() => onNavigate('anggota')}
            className="group relative bg-white rounded-2xl p-3.5 text-left border border-stone-200 shadow-xs hover:shadow-md hover:border-stone-400 transition-all duration-200 active:scale-[0.97] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-stone-100 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-stone-200 text-stone-700 flex items-center justify-center shadow-xs">
                  <Flower2 size={19} className="stroke-[2.2]" />
                </div>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                  Almarhum/ah
                </span>
              </div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Meninggal
              </div>
              <div className="text-[17px] font-extrabold text-stone-800 leading-tight mt-1">
                {deceasedCount} <span className="text-xs font-semibold text-slate-500">Orang</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-500">
              <span className="text-stone-700 font-medium">Mendoakan</span>
              <ChevronRight size={13} className="text-slate-400 group-hover:text-stone-700" />
            </div>
          </button>
        </div>

        {/* Section: Aktivitas Terbaru */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-stone-100">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Clock size={15} />
              </div>
              <h2 className="text-[14px] font-bold text-slate-800 leading-tight">Aktivitas Terbaru</h2>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Pembaruan sistem</span>
          </div>

          <div className="space-y-2.5">
            {activities.slice(0, 3).map((act) => (
              <div
                key={act.id}
                onClick={() => {
                  if (act.iconType === 'user') onNavigate('anggota');
                  else if (act.iconType === 'calendar') onNavigate('agenda');
                  else if (act.iconType === 'cash') onNavigate('kas');
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    act.iconType === 'user' ? 'bg-blue-100 text-blue-700' :
                    act.iconType === 'calendar' ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {act.iconType === 'user' ? <Users size={14} /> :
                     act.iconType === 'calendar' ? <Calendar size={14} /> :
                     <Wallet size={14} />}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-800 leading-tight group-hover:text-emerald-800 transition-colors">
                      {act.description}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{act.timeAgo}</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
