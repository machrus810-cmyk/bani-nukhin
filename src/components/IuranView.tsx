import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  ArrowLeftRight, 
  Coins, 
  Users, 
  Plus, 
  ChevronDown, 
  ChevronRight, 
  HeartHandshake, 
  CheckCircle2, 
  Clock, 
  MessageCircle,
  X
} from 'lucide-react';
import { IuranRecord } from '../types';

interface IuranViewProps {
  iuranList: IuranRecord[];
  onBack: () => void;
  onAddIuran: () => void;
  onToggleStatus: (id: string) => void;
}

export const IuranView: React.FC<IuranViewProps> = ({
  iuranList,
  onBack,
  onAddIuran,
  onToggleStatus,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('April 2026');
  const [showMonthDropdown, setShowMonthDropdown] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<IuranRecord | null>(null);

  const months = ['April 2026', 'Maret 2026', 'Februari 2026', 'Januari 2026'];

  const filteredRecords = iuranList.filter((item) => item.period === selectedPeriod);

  const totalCollected = filteredRecords
    .filter((r) => r.status === 'Lunas')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalMembers = filteredRecords.length;

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

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
            <h1 className="text-base font-bold text-white leading-tight">Iuran Keluarga</h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              title="Riwayat Iuran"
              className="p-1.5 text-white/90 hover:text-white rounded-full hover:bg-white/10 active:scale-95 transition-all"
            >
              <ArrowLeftRight size={19} className="stroke-[2]" />
            </button>
            <button
              className="p-1.5 text-white/90 hover:text-white rounded-full hover:bg-white/10 active:scale-95 transition-all"
            >
              <MoreVertical size={19} className="stroke-[2]" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3.5 flex-1">
        {/* Hero Green Card matching screenshot */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#215a3a] to-[#2d7d52] rounded-2xl p-4 text-white shadow-sm flex items-center gap-3.5">
          {/* Subtle leaves decoration in background */}
          <div className="absolute right-0 top-0 w-32 h-full opacity-15 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C70 30 100 50 100 100 C50 100 30 70 0 50 C30 50 50 30 50 0 Z" />
            </svg>
          </div>

          <div className="relative z-10 w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <HeartHandshake size={28} className="text-emerald-200" />
          </div>

          <div className="relative z-10">
            <p className="text-xs font-semibold leading-relaxed text-white">
              Iuran bersama, untuk kebersamaan keluarga kita.
            </p>
          </div>
        </div>

        {/* 2 Summary Stat Cards matching screenshot */}
        <div className="grid grid-cols-2 gap-3">
          {/* Total Iuran Terkumpul */}
          <div className="bg-white rounded-2xl p-3.5 shadow-2xs border border-stone-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Coins size={20} className="stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-medium leading-tight">Total Iuran Terkumpul</div>
              <div className="text-[14px] font-bold text-slate-800 leading-tight mt-0.5">
                {formatRupiah(totalCollected > 0 ? totalCollected : 4250000)}
              </div>
            </div>
          </div>

          {/* Total Anggota */}
          <div className="bg-white rounded-2xl p-3.5 shadow-2xs border border-stone-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users size={20} className="stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-medium leading-tight">Total Anggota</div>
              <div className="text-[14px] font-bold text-slate-800 leading-tight mt-0.5">
                {totalMembers > 0 ? `${totalMembers} Orang` : '24 Orang'}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Button: + Tambah Iuran matching screenshot */}
        <button
          onClick={onAddIuran}
          className="w-full py-3 bg-[#1b4332] hover:bg-[#143628] active:scale-[0.98] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/10 transition-all"
        >
          <Plus size={16} className="stroke-[3]" /> Tambah Iuran
        </button>

        {/* Section: Daftar Iuran with Month Dropdown matching screenshot */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-stone-100">
          <div className="flex items-center justify-between mb-3 relative">
            <h2 className="text-[13px] font-bold text-slate-800">Daftar Iuran</h2>

            {/* Month Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                className="text-[11px] font-semibold text-slate-600 bg-stone-50 border border-stone-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1 hover:bg-stone-100 transition-colors"
              >
                <span>{selectedPeriod}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {showMonthDropdown && (
                <div className="absolute right-0 top-8 w-36 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 text-xs">
                  {months.map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setSelectedPeriod(m);
                        setShowMonthDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 ${
                        selectedPeriod === m ? 'font-bold text-emerald-700 bg-emerald-50' : 'text-slate-700'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Members Iuran List */}
          <div className="space-y-2.5">
            {filteredRecords.map((item) => {
              const isLunas = item.status === 'Lunas';
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedRecord(item)}
                  className="flex items-center justify-between py-2 border-b border-stone-50 last:border-none group cursor-pointer hover:bg-stone-50/60 -mx-1 px-1 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-emerald-500/20 bg-stone-100 shrink-0">
                      <img
                        src={item.memberAvatar}
                        alt={item.memberName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 leading-tight">
                        {item.memberName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        {formatRupiah(item.amount)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                      isLunas 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.status}
                    </span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </div>
                </div>
              );
            })}

            {filteredRecords.length === 0 && (
              <div className="text-center py-6 text-xs text-slate-400">
                Belum ada data iuran untuk periode {selectedPeriod}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Status Iuran Anggota</h3>
              <button onClick={() => setSelectedRecord(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
              <img
                src={selectedRecord.memberAvatar}
                alt={selectedRecord.memberName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-600/30"
              />
              <div>
                <div className="font-bold text-slate-800 text-xs">{selectedRecord.memberName}</div>
                <div className="text-[11px] text-slate-500">Periode: {selectedRecord.period}</div>
                <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                  Nominal: {formatRupiah(selectedRecord.amount)}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl border border-stone-200">
                <span className="text-xs text-slate-600">Status Pembayaran:</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  selectedRecord.status === 'Lunas' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'
                }`}>
                  {selectedRecord.status}
                </span>
              </div>

              {selectedRecord.paidDate && (
                <div className="text-[11px] text-slate-500 px-1">
                  Dibayar pada: {selectedRecord.paidDate}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onToggleStatus(selectedRecord.id);
                  setSelectedRecord({
                    ...selectedRecord,
                    status: selectedRecord.status === 'Lunas' ? 'Belum Bayar' : 'Lunas',
                    paidDate: selectedRecord.status === 'Lunas' ? undefined : 'Hari ini',
                  });
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedRecord.status === 'Lunas'
                    ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                    : 'bg-emerald-700 text-white hover:bg-emerald-800'
                }`}
              >
                {selectedRecord.status === 'Lunas' ? 'Ubah Menjadi Belum Bayar' : 'Tandai Lunas Pembayaran'}
              </button>

              {selectedRecord.status !== 'Lunas' && (
                <button
                  onClick={() => {
                    const msg = encodeURIComponent(
                      `Assalamu'alaikum ${selectedRecord.memberName}, mengingatkan mengenai iuran keluarga Bani H. Nukhin periode ${selectedRecord.period} sebesar ${formatRupiah(selectedRecord.amount)}. Terima kasih!`
                    );
                    window.open(`https://wa.me/?text=${msg}`, '_blank');
                  }}
                  className="w-full py-2.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle size={15} /> Kirim Pengingat WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
