import React, { useState } from 'react';
import { X, HeartHandshake } from 'lucide-react';
import { IuranRecord, FamilyMember } from '../types';

interface AddIuranModalProps {
  isOpen: boolean;
  members: FamilyMember[];
  onClose: () => void;
  onSave: (record: IuranRecord) => void;
}

export const AddIuranModal: React.FC<AddIuranModalProps> = ({
  isOpen,
  members,
  onClose,
  onSave,
}) => {
  const [memberId, setMemberId] = useState(members[0]?.id || '');
  const [amount, setAmount] = useState('100000');
  const [period, setPeriod] = useState('April 2026');
  const [status, setStatus] = useState<'Lunas' | 'Belum Bayar'>('Lunas');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedMember = members.find((m) => m.id === memberId) || members[0];
    if (!selectedMember) return;

    const newRecord: IuranRecord = {
      id: `iur-${Date.now()}`,
      memberId: selectedMember.id,
      memberName: selectedMember.name,
      memberAvatar: selectedMember.avatarUrl,
      amount: Number(amount) || 100000,
      period,
      status,
      paidDate: status === 'Lunas' ? new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : undefined,
    };

    onSave(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2 text-emerald-800">
            <HeartHandshake size={20} />
            <h3 className="font-bold text-base text-slate-900">Catat Iuran Keluarga</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Pilih Anggota Keluarga *</label>
            <select
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.roleLabel || `Gen ${m.generation}`})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Periode Bulan</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              >
                <option value="April 2026">April 2026</option>
                <option value="Mei 2026">Mei 2026</option>
                <option value="Juni 2026">Juni 2026</option>
                <option value="Maret 2026">Maret 2026</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nominal (Rp)</label>
              <input
                type="number"
                step={10000}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Status Pembayaran</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus('Lunas')}
                className={`py-2 rounded-xl font-semibold border ${
                  status === 'Lunas' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-stone-50 text-slate-600'
                }`}
              >
                Lunas (Sudah Bayar)
              </button>
              <button
                type="button"
                onClick={() => setStatus('Belum Bayar')}
                className={`py-2 rounded-xl font-semibold border ${
                  status === 'Belum Bayar' ? 'bg-rose-600 text-white border-rose-600' : 'bg-stone-50 text-slate-600'
                }`}
              >
                Belum Bayar
              </button>
            </div>
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
              className="flex-1 py-2.5 bg-[#1b4332] text-white font-bold rounded-xl hover:bg-[#143628] shadow-md"
            >
              Simpan Iuran
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
