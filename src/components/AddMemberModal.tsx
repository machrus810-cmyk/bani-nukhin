import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { FamilyMember, Gender, MemberStatus } from '../types';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: FamilyMember) => void;
  existingParents: FamilyMember[];
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingParents,
}) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [generation, setGeneration] = useState<number>(3);
  const [roleLabel, setRoleLabel] = useState('Cucu');
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [birthDateFull, setBirthDateFull] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [status, setStatus] = useState<MemberStatus>('alive');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [education, setEducation] = useState('S1');
  const [parentId, setParentId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parent = existingParents.find((p) => p.id === parentId);

    const newMember: FamilyMember = {
      id: `m-${Date.now()}`,
      name: name.trim(),
      nickname: nickname.trim() || name.split(' ')[0],
      generation,
      roleLabel,
      birthYear: Number(birthYear) || 2000,
      birthDateFull: birthDateFull.trim() || `${birthYear}`,
      gender,
      status,
      address: address.trim() || 'Indonesia',
      phone: phone.trim() || '-',
      occupation: occupation.trim() || 'Wiraswasta',
      education: education.trim() || 'SMA/S1',
      avatarUrl: gender === 'male'
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      parentId: parent ? parent.id : undefined,
      parentsText: parent ? parent.name : undefined,
    };

    onSave(newMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md p-5 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2 text-emerald-800">
            <UserPlus size={20} />
            <h3 className="font-bold text-base text-slate-900">Tambah Anggota Silsilah</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Nama Lengkap *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Muhammad Fauzan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nama Panggilan</label>
              <input
                type="text"
                placeholder="Fauzan"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Generasi</label>
              <select
                value={generation}
                onChange={(e) => {
                  const gen = Number(e.target.value);
                  setGeneration(gen);
                  setRoleLabel(gen === 1 ? 'Sesepuh' : gen === 2 ? 'Anak' : gen === 3 ? 'Cucu' : 'Cicit');
                }}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              >
                <option value={1}>Gen 1 (Sesepuh/Pendiri)</option>
                <option value={2}>Gen 2 (Anak)</option>
                <option value={3}>Gen 3 (Cucu)</option>
                <option value={4}>Gen 4 (Cicit)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Jenis Kelamin</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-1.5 rounded-lg border text-center font-medium ${
                    gender === 'male' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-stone-50 text-slate-600'
                  }`}
                >
                  Laki-laki
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-1.5 rounded-lg border text-center font-medium ${
                    gender === 'female' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-stone-50 text-slate-600'
                  }`}
                >
                  Perempuan
                </button>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Status Kehidupan</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as MemberStatus)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              >
                <option value="alive">Masih Hidup</option>
                <option value="deceased">Almarhum / Almarhumah</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tahun Lahir</label>
              <input
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tanggal Lengkap</label>
              <input
                type="text"
                placeholder="15 Mei 2000"
                value={birthDateFull}
                onChange={(e) => setBirthDateFull(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Orang Tua (Jalur Silsilah)</label>
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
            >
              <option value="">Pilih Orang Tua...</option>
              {existingParents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Gen {p.generation})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">No. WhatsApp/HP</label>
              <input
                type="text"
                placeholder="0812..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Pekerjaan</label>
              <input
                type="text"
                placeholder="Guru / Karyawan"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Alamat Domisili</label>
            <input
              type="text"
              placeholder="Contoh: Jl. Melati No. 12, Jakarta"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
            />
          </div>

          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-stone-100 text-slate-700 font-semibold rounded-xl hover:bg-stone-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#1b4332] text-white font-bold rounded-xl hover:bg-[#143628] shadow-md transition-colors"
            >
              Simpan Anggota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
