import React, { useState } from 'react';
import { X, Wallet } from 'lucide-react';
import { CashTransaction, TransactionType } from '../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  initialType?: TransactionType;
  onClose: () => void;
  onSave: (tx: CashTransaction) => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  initialType = 'in',
  onClose,
  onSave,
}) => {
  const [type, setType] = useState<TransactionType>(initialType);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<string>('100000');
  const [category, setCategory] = useState('Iuran');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    const parsedDate = new Date(date);
    const dateFormatted = parsedDate.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newTx: CashTransaction = {
      id: `tx-${Date.now()}`,
      title: title.trim(),
      amount: Math.abs(Number(amount)) || 0,
      type,
      category,
      date: dateFormatted,
      iconName: type === 'in' ? 'home' : 'bag',
      note: note.trim(),
    };

    onSave(newTx);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2 text-emerald-800">
            <Wallet size={20} />
            <h3 className="font-bold text-base text-slate-900">Catat Transaksi Kas</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Tipe Transaksi</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('in')}
                className={`py-2 rounded-xl font-bold border transition-colors ${
                  type === 'in'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-stone-50 text-slate-600 border-stone-200'
                }`}
              >
                + Pemasukan Kas
              </button>
              <button
                type="button"
                onClick={() => setType('out')}
                className={`py-2 rounded-xl font-bold border transition-colors ${
                  type === 'out'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-stone-50 text-slate-600 border-stone-200'
                }`}
              >
                - Pengeluaran Kas
              </button>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Judul Transaksi *</label>
            <input
              type="text"
              required
              placeholder={type === 'in' ? 'Contoh: Iuran Kas Bulan Mei' : 'Contoh: Belanja Konsumsi Arisan'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nominal (Rp) *</label>
              <input
                type="number"
                required
                min={1000}
                step={1000}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tanggal</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
            >
              {type === 'in' ? (
                <>
                  <option value="Iuran">Iuran Anggota</option>
                  <option value="Donasi">Infaq / Donasi Sukarela</option>
                  <option value="Hasil Usaha">Bunga / Hasil Kas</option>
                  <option value="Lainnya">Lain-lain</option>
                </>
              ) : (
                <>
                  <option value="Konsumsi">Konsumsi & Acara</option>
                  <option value="Operasional">Transportasi / Logistik</option>
                  <option value="Sosial">Santunan & Sosial</option>
                  <option value="Perlengkapan">Perlengkapan Keluarga</option>
                  <option value="Lainnya">Lain-lain</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Catatan Tambahan</label>
            <textarea
              rows={2}
              placeholder="Keterangan rincian pembayaran..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-stone-100 text-slate-700 font-semibold rounded-xl hover:bg-stone-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`flex-1 py-2.5 text-white font-bold rounded-xl shadow-md ${
                type === 'in' ? 'bg-[#1b4332] hover:bg-[#143628]' : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
