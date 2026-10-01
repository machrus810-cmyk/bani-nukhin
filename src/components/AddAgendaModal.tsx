import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { AgendaItem, AgendaCategory } from '../types';

interface AddAgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agenda: AgendaItem) => void;
}

export const AddAgendaModal: React.FC<AddAgendaModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Penting' | 'Rutin' | 'Acara'>('Acara');
  const [date, setDate] = useState('2026-05-20');
  const [time, setTime] = useState('09:00');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Format display string e.g. "20 Mei 2026 • 09:00"
    const parsedDate = new Date(`${date}T${time}:00`);
    const dateStr = parsedDate.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const newAgenda: AgendaItem = {
      id: `ag-${Date.now()}`,
      title: title.trim(),
      category,
      dateTime: `${dateStr} • ${time}`,
      dateRaw: `${date}T${time}:00`,
      location: location.trim() || 'Lokasi Keluarga',
      description: description.trim() || 'Pertemuan silaturahmi keluarga besar Bani H. Nukhin.',
    };

    onSave(newAgenda);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2 text-emerald-800">
            <Calendar size={20} />
            <h3 className="font-bold text-base text-slate-900">Tambah Agenda Baru</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Nama Acara / Agenda *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Halal Bihalal Idul Fitri"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Kategori</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Penting', 'Rutin', 'Acara'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-1.5 rounded-lg border text-center font-semibold ${
                    category === cat
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-stone-50 text-slate-600 border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tanggal</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Waktu</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Lokasi / Tempat</label>
            <input
              type="text"
              placeholder="Kediaman Keluarga / Gedung Pertemuan"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Keterangan / Catatan</label>
            <textarea
              rows={3}
              placeholder="Deskripsi acara, pembagian tugas, dsb."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              className="flex-1 py-2.5 bg-[#1b4332] text-white font-bold rounded-xl hover:bg-[#143628] shadow-md"
            >
              Simpan Agenda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
