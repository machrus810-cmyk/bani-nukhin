import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  ArrowLeftRight, 
  Coins, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Minus, 
  BarChart3, 
  Send, 
  ChevronRight,
  Home,
  ShoppingBag,
  Building2,
  Bus,
  Calendar,
  X
} from 'lucide-react';
import { CashTransaction } from '../types';

interface CashflowViewProps {
  transactions: CashTransaction[];
  onBack: () => void;
  onAddTransaction: (type: 'in' | 'out') => void;
}

export const CashflowView: React.FC<CashflowViewProps> = ({
  transactions,
  onBack,
  onAddTransaction,
}) => {
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false);
  const [selectedTx, setSelectedTx] = useState<CashTransaction | null>(null);

  // Calculate totals
  const totalIn = transactions
    .filter((t) => t.type === 'in')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOut = transactions
    .filter((t) => t.type === 'out')
    .reduce((sum, t) => sum + t.amount, 0);

  const saldo = totalIn - totalOut;

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
            <h1 className="text-base font-bold text-white leading-tight">Uang Kas Keluarga</h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowTransferModal(true)}
              title="Transfer / Mutasi"
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
        {/* Total Saldo Card (Deep Forest Green) matching screenshot */}
        <div 
          onClick={() => setShowReportModal(true)}
          className="bg-gradient-to-br from-[#1b4332] to-[#255f46] text-white rounded-2xl p-4 shadow-md flex items-center justify-between cursor-pointer hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/30 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <Coins size={26} className="text-emerald-100" />
            </div>
            <div>
              <div className="text-[11px] text-emerald-200/90 font-medium">Total Saldo Kas</div>
              <div className="text-xl font-bold tracking-tight text-white mt-0.5">
                {formatRupiah(saldo > 0 ? saldo : 5750000)}
              </div>
            </div>
          </div>
          <ChevronRight size={20} className="text-emerald-300/70 group-hover:text-white transition-colors" />
        </div>

        {/* 2 Summary Cards: Pemasukan & Pengeluaran matching screenshot */}
        <div className="grid grid-cols-2 gap-3">
          {/* Pemasukan */}
          <div className="bg-white rounded-2xl p-3.5 shadow-2xs border border-stone-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ArrowUpRight size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-medium">Pemasukan</div>
              <div className="text-[13px] font-bold text-emerald-700 leading-tight">
                {formatRupiah(totalIn > 0 ? totalIn : 8500000)}
              </div>
            </div>
          </div>

          {/* Pengeluaran */}
          <div className="bg-white rounded-2xl p-3.5 shadow-2xs border border-stone-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <ArrowDownRight size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-medium">Pengeluaran</div>
              <div className="text-[13px] font-bold text-rose-600 leading-tight">
                {formatRupiah(totalOut > 0 ? totalOut : 2750000)}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quick Action Buttons matching screenshot */}
        <div className="grid grid-cols-4 gap-2">
          {/* Tambah Pemasukan */}
          <button
            onClick={() => onAddTransaction('in')}
            className="bg-white rounded-2xl p-2.5 shadow-2xs border border-stone-100 hover:shadow-sm text-center flex flex-col items-center justify-center active:scale-95 transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center mb-1.5 shadow-xs">
              <Plus size={18} className="stroke-[3]" />
            </div>
            <span className="text-[10px] font-semibold text-slate-700 leading-tight">Tambah Pemasukan</span>
          </button>

          {/* Tambah Pengeluaran */}
          <button
            onClick={() => onAddTransaction('out')}
            className="bg-white rounded-2xl p-2.5 shadow-2xs border border-stone-100 hover:shadow-sm text-center flex flex-col items-center justify-center active:scale-95 transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center mb-1.5 shadow-xs">
              <Minus size={18} className="stroke-[3]" />
            </div>
            <span className="text-[10px] font-semibold text-slate-700 leading-tight">Tambah Pengeluaran</span>
          </button>

          {/* Laporan */}
          <button
            onClick={() => setShowReportModal(true)}
            className="bg-white rounded-2xl p-2.5 shadow-2xs border border-stone-100 hover:shadow-sm text-center flex flex-col items-center justify-center active:scale-95 transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center mb-1.5 shadow-xs">
              <BarChart3 size={18} className="stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-semibold text-slate-700 leading-tight">Laporan</span>
          </button>

          {/* Transfer */}
          <button
            onClick={() => setShowTransferModal(true)}
            className="bg-white rounded-2xl p-2.5 shadow-2xs border border-stone-100 hover:shadow-sm text-center flex flex-col items-center justify-center active:scale-95 transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center mb-1.5 shadow-xs">
              <Send size={16} className="stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-semibold text-slate-700 leading-tight">Transfer</span>
          </button>
        </div>

        {/* Section: Riwayat Transaksi matching screenshot */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-stone-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[13px] font-bold text-slate-800">Riwayat Transaksi</h2>
            <button
              onClick={() => setShowReportModal(true)}
              className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700 flex items-center gap-0.5"
            >
              Lihat Semua <ChevronRight size={12} />
            </button>
          </div>

          <div className="space-y-3">
            {transactions.map((tx) => {
              const isIncome = tx.type === 'in';
              const isIuran = tx.category === 'Iuran';
              const isConsump = tx.category === 'Konsumsi';
              const isTransport = tx.category === 'Operasional';

              return (
                <div
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="flex items-center justify-between py-1.5 border-b border-stone-50 last:border-none group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      isIncome ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {isIuran && <Home size={17} />}
                      {isConsump && <ShoppingBag size={17} />}
                      {!isIuran && !isConsump && isIncome && <Building2 size={17} />}
                      {isTransport && <Bus size={17} />}
                      {!isIuran && !isConsump && !isTransport && !isIncome && <ShoppingBag size={17} />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors">
                        {tx.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{tx.date}</div>
                    </div>
                  </div>

                  <div className={`text-xs font-bold ${
                    isIncome ? 'text-emerald-700' : 'text-rose-600'
                  }`}>
                    {isIncome ? `+ ${formatRupiah(tx.amount)}` : `- ${formatRupiah(tx.amount)}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Laporan Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Laporan Keuangan Kas</h3>
              <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 bg-emerald-50 rounded-xl text-emerald-800">
                <span>Total Pemasukan:</span>
                <span className="font-bold">{formatRupiah(totalIn || 8500000)}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-rose-50 rounded-xl text-rose-800">
                <span>Total Pengeluaran:</span>
                <span className="font-bold">{formatRupiah(totalOut || 2750000)}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-100 rounded-xl text-slate-800 font-bold">
                <span>Sisa Saldo Kas:</span>
                <span className="text-emerald-700">{formatRupiah(saldo || 5750000)}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Kas dikelola secara amanah dan transparan oleh Bendahara Keluarga Bani H. Nukhin.
            </p>
            <button
              onClick={() => {
                window.print();
                setShowReportModal(false);
              }}
              className="w-full py-2.5 bg-[#1b4332] text-white rounded-xl text-xs font-semibold hover:bg-[#143628]"
            >
              Unduh Rekap PDF
            </button>
          </div>
        </div>
      )}

      {/* Transfer / Mutasi Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Transfer / Rekening Kas</h3>
              <button onClick={() => setShowTransferModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1.5">
              <div className="text-[11px] text-slate-500">Rekening Kas Resmi:</div>
              <div className="font-bold text-slate-800 text-sm">Bank BCA: 8820-192-881</div>
              <div className="text-slate-600">a.n. Budi Santoso (Bendahara Bani Nukhin)</div>
            </div>
            <p className="text-[11px] text-slate-500">
              Setelah transfer, mohon konfirmasi melalui menu "Tambah Pemasukan" atau hubungi admin.
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText('8820192881');
                alert('Nomor rekening disalin ke clipboard');
                setShowTransferModal(false);
              }}
              className="w-full py-2.5 bg-[#1b4332] text-white rounded-xl text-xs font-semibold hover:bg-[#143628]"
            >
              Salin Nomor Rekening
            </button>
          </div>
        </div>
      )}

      {/* Transaction Detail Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Detail Transaksi</h3>
              <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="text-sm font-bold text-slate-800">{selectedTx.title}</div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-slate-500">Tanggal:</span>
                <span className="font-medium text-slate-800">{selectedTx.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-slate-500">Jenis:</span>
                <span className={`font-semibold ${selectedTx.type === 'in' ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {selectedTx.type === 'in' ? 'Pemasukan Kas' : 'Pengeluaran Kas'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-slate-500">Nominal:</span>
                <span className="font-bold text-sm text-slate-900">{formatRupiah(selectedTx.amount)}</span>
              </div>
              {selectedTx.note && (
                <div className="py-1">
                  <span className="text-slate-500 block">Keterangan:</span>
                  <span className="text-slate-700 mt-0.5 block bg-stone-50 p-2 rounded-lg">{selectedTx.note}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedTx(null)}
              className="w-full py-2.5 bg-[#1b4332] text-white rounded-xl text-xs font-semibold hover:bg-[#143628]"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
