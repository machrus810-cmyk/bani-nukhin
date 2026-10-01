import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  Calendar as CalendarIcon, 
  Plus, 
  Cake, 
  Users, 
  Home, 
  UserCheck, 
  Sparkles, 
  ChevronRight,
  MapPin,
  Clock,
  Share2
} from 'lucide-react';
import { AgendaItem, AgendaCategory } from '../types';

interface AgendaViewProps {
  agendas: AgendaItem[];
  onBack: () => void;
  onAddAgenda: () => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  agendas,
  onBack,
  onAddAgenda,
}) => {
  const [activeCategory, setActiveCategory] = useState<AgendaCategory>('Semua');
  const [selectedAgenda, setSelectedAgenda] = useState<AgendaItem | null>(null);

  const filteredAgendas = agendas.filter((item) => {
    if (activeCategory === 'Semua') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="relative min-h-full flex flex-col bg-[#F8F6F0] pb-16">
      {/* Top Header App Bar */}
      <div className="bg-[#173e2a] text-white px-4 pt-3 pb-3 relative z-30 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 -ml-1 text-white/90 hover:text-white active:scale-95 transition-transform"
              aria-label="Kembali"
            >
              <ArrowLeft size={22} className="stroke-[2.2]" />
            </button>
            <h1 className="text-base font-bold text-white leading-tight">Agenda Keluarga</h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onAddAgenda}
              title="Tambah Agenda"
              className="p-1.5 text-white/90 hover:text-white rounded-full hover:bg-white/10 active:scale-95 transition-all"
            >
              <CalendarIcon size={19} className="stroke-[2]" />
            </button>
            <button
              className="p-1.5 text-white/90 hover:text-white rounded-full hover:bg-white/10 active:scale-95 transition-all"
            >
              <MoreVertical size={19} className="stroke-[2]" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Hero Banner Green Card matching screenshot */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#215a3a] to-[#2d7d52] rounded-2xl p-4 text-white shadow-sm flex items-center gap-3.5">
          {/* Subtle leaves decoration in background */}
          <div className="absolute right-0 top-0 w-32 h-full opacity-15 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C70 30 100 50 100 100 C50 100 30 70 0 50 C30 50 50 30 50 0 Z" />
            </svg>
          </div>

          {/* 3D Calendar Graphic */}
          <div className="relative z-10 w-12 h-12 rounded-xl bg-amber-400 p-2 shadow-md flex flex-col justify-between shrink-0 text-slate-900 border border-amber-300">
            <div className="flex items-center justify-between px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900/60"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900/60"></span>
            </div>
            <div className="grid grid-cols-3 gap-0.5 my-auto px-0.5">
              <div className="w-1.5 h-1.5 bg-slate-900 rounded-xs"></div>
              <div className="w-1.5 h-1.5 bg-slate-900 rounded-xs"></div>
              <div className="w-1.5 h-1.5 bg-rose-600 rounded-xs"></div>
              <div className="w-1.5 h-1.5 bg-slate-900 rounded-xs"></div>
              <div className="w-1.5 h-1.5 bg-slate-900 rounded-xs"></div>
              <div className="w-1.5 h-1.5 bg-slate-900 rounded-xs"></div>
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-xs font-semibold leading-relaxed text-white">
              Jaga kebersamaan, catat setiap momen penting keluarga kita.
            </p>
          </div>
        </div>

        {/* Category Pill Filters matching screenshot */}
        <div className="flex items-center gap-2">
          {(['Semua', 'Penting', 'Rutin', 'Acara'] as AgendaCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#184631] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-stone-200/80 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Agenda Item Cards matching screenshot */}
        <div className="space-y-2.5">
          {filteredAgendas.map((item) => {
            // Determine icon and colors based on item
            const isUlangTahun = item.title.toLowerCase().includes('ulang tahun');
            const isReuni = item.title.toLowerCase().includes('reuni');
            const isPengajian = item.title.toLowerCase().includes('pengajian');
            const isRapat = item.title.toLowerCase().includes('rapat');

            return (
              <div
                key={item.id}
                onClick={() => setSelectedAgenda(item)}
                className="bg-white rounded-2xl p-3.5 shadow-2xs border border-stone-100/90 flex items-center justify-between hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  {/* Icon Circle */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isUlangTahun ? 'bg-rose-50 text-rose-600' :
                    isReuni ? 'bg-emerald-50 text-emerald-600' :
                    isPengajian ? 'bg-teal-50 text-teal-600' :
                    isRapat ? 'bg-amber-50 text-amber-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    {isUlangTahun && <Cake size={20} />}
                    {isReuni && <Users size={20} />}
                    {isPengajian && <Home size={20} />}
                    {isRapat && <UserCheck size={20} />}
                    {!isUlangTahun && !isReuni && !isPengajian && !isRapat && <Sparkles size={20} />}
                  </div>

                  {/* Title & DateTime */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 leading-tight group-hover:text-emerald-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                      <span>{item.dateTime}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Category Badge + Chevron */}
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                    item.category === 'Penting' ? 'bg-amber-100 text-amber-700' :
                    item.category === 'Rutin' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-sky-100 text-sky-700'
                  }`}>
                    {item.category}
                  </span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>
              </div>
            );
          })}

          {filteredAgendas.length === 0 && (
            <div className="text-center py-10 bg-white rounded-2xl border border-stone-100 p-6">
              <CalendarIcon size={32} className="mx-auto text-slate-300 mb-2" />
              <p className="text-xs text-slate-600 font-medium">Tidak ada agenda untuk kategori ini.</p>
              <button
                onClick={onAddAgenda}
                className="mt-3 text-xs font-semibold text-emerald-700 underline"
              >
                + Tambah Agenda Baru
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button (+) matching screenshot bottom right */}
      <button
        onClick={onAddAgenda}
        className="fixed bottom-20 right-5 z-30 w-13 h-13 rounded-full bg-[#1b4332] hover:bg-[#143628] text-white flex items-center justify-center shadow-lg shadow-emerald-950/20 active:scale-95 transition-transform"
        aria-label="Tambah Agenda"
      >
        <Plus size={26} className="stroke-[2.5]" />
      </button>

      {/* Agenda Detail Modal */}
      {selectedAgenda && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                  selectedAgenda.category === 'Penting' ? 'bg-amber-100 text-amber-700' :
                  selectedAgenda.category === 'Rutin' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-sky-100 text-sky-700'
                }`}>
                  {selectedAgenda.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">{selectedAgenda.title}</h3>
              </div>
              <button
                onClick={() => setSelectedAgenda(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 bg-stone-50 p-3.5 rounded-xl border border-stone-100">
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-emerald-700 shrink-0" />
                <span className="font-medium text-slate-800">{selectedAgenda.dateTime}</span>
              </div>
              {selectedAgenda.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-emerald-700 shrink-0" />
                  <span className="text-slate-700">{selectedAgenda.location}</span>
                </div>
              )}
            </div>

            {selectedAgenda.description && (
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedAgenda.description}
              </p>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  const text = `Agenda Bani H. Nukhin: ${selectedAgenda.title} (${selectedAgenda.dateTime}) di ${selectedAgenda.location || 'Tempat bersama'}`;
                  if (navigator.share) {
                    navigator.share({ title: selectedAgenda.title, text }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(text);
                    alert('Detail agenda disalin ke clipboard');
                  }
                }}
                className="flex-1 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors"
              >
                <Share2 size={14} /> Bagikan ke WA
              </button>
              <button
                onClick={() => setSelectedAgenda(null)}
                className="py-2.5 px-4 bg-[#1b4332] text-white rounded-xl text-xs font-semibold hover:bg-[#143628] transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
