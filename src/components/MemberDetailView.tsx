import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit3, 
  MoreVertical, 
  User, 
  MapPin, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  Network, 
  ChevronRight,
  MessageCircle,
  Share2
} from 'lucide-react';
import { FamilyMember } from '../types';

interface MemberDetailViewProps {
  member: FamilyMember;
  allMembers: FamilyMember[];
  onBack: () => void;
  onSelectMember: (member: FamilyMember) => void;
  onEditMember: (member: FamilyMember) => void;
}

export const MemberDetailView: React.FC<MemberDetailViewProps> = ({
  member,
  allMembers,
  onBack,
  onSelectMember,
  onEditMember,
}) => {
  const [showToast, setShowToast] = useState<string | null>(null);

  // Other members for the bottom horizontal gallery (excluding the current one)
  const otherMembers = allMembers.filter((m) => m.id !== member.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Profil Silsilah: ${member.name}`,
        text: `Data silsilah ${member.name} - Keluarga Besar Bani H. Nukhin`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setShowToast('Tautan profil disalin!');
      setTimeout(() => setShowToast(null), 2500);
    }
  };

  return (
    <div className="relative min-h-full flex flex-col bg-[#F8F6F0] pb-10">
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
            <h1 className="text-base font-bold text-white leading-tight">Detail Anggota</h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEditMember(member)}
              title="Edit Data Anggota"
              className="p-1.5 text-white/90 hover:text-white rounded-full hover:bg-white/10 active:scale-95 transition-all"
            >
              <Edit3 size={19} className="stroke-[2]" />
            </button>
            <button
              onClick={handleShare}
              title="Bagikan Profil"
              className="p-1.5 text-white/90 hover:text-white rounded-full hover:bg-white/10 active:scale-95 transition-all"
            >
              <Share2 size={19} className="stroke-[2]" />
            </button>
            <button
              className="p-1.5 text-white/90 hover:text-white rounded-full hover:bg-white/10 active:scale-95 transition-all"
            >
              <MoreVertical size={19} className="stroke-[2]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Profile Body */}
      <div className="p-4 space-y-4">
        {/* Main Card with Big Photo & Identity */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-100/90">
          {/* Top Avatar & Name with Status */}
          <div className="flex items-center gap-4 pb-4 border-b border-stone-100">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-emerald-500/20 shadow-md bg-stone-100 shrink-0">
              <img
                src={member.avatarUrl}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900 leading-tight">
                  {member.name}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#1e5631] text-white">
                  {member.roleLabel || (member.generation === 1 ? 'Sesepuh' : member.generation === 2 ? 'Anak' : 'Cucu')}
                </span>
              </div>

              {/* Bio summary table matching screenshot */}
              <div className="mt-2 text-xs space-y-1 text-slate-600">
                <div className="grid grid-cols-[55px_10px_1fr] items-baseline">
                  <span className="text-slate-500">Lahir</span>
                  <span className="text-slate-400">:</span>
                  <span className="font-medium text-slate-800">{member.birthDateFull || member.birthYear}</span>
                </div>
                <div className="grid grid-cols-[55px_10px_1fr] items-baseline">
                  <span className="text-slate-500">Wafat</span>
                  <span className="text-slate-400">:</span>
                  <span className="font-medium text-slate-800">{member.deathYear ? `${member.deathYear}` : '-'}</span>
                </div>
                <div className="grid grid-cols-[55px_10px_1fr] items-baseline">
                  <span className="text-slate-500">Status</span>
                  <span className="text-slate-400">:</span>
                  <span className={`font-semibold ${member.status === 'alive' ? 'text-emerald-700' : 'text-slate-500'}`}>
                    {member.status === 'alive' ? 'Masih Hidup' : 'Almarhum/Almarhumah'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Field Rows matching screenshot */}
          <div className="pt-4 space-y-3.5">
            {/* 1. Jenis Kelamin */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                <User size={18} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Jenis Kelamin</div>
                <div className="text-xs font-semibold text-slate-800">
                  {member.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                </div>
              </div>
            </div>

            {/* 2. Alamat */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Alamat</div>
                <div className="text-xs font-semibold text-slate-800">
                  {member.address || '-'}
                </div>
              </div>
            </div>

            {/* 3. No. Telepon */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">No. Telepon</div>
                  <div className="text-xs font-semibold text-slate-800">
                    {member.phone || '-'}
                  </div>
                </div>
              </div>
              {member.phone && member.phone !== '-' && (
                <div className="flex items-center gap-1.5">
                  <a
                    href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                    title="Hubungi via WhatsApp"
                  >
                    <MessageCircle size={16} />
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    title="Panggil Telepon"
                  >
                    <Phone size={16} />
                  </a>
                </div>
              )}
            </div>

            {/* 4. Pekerjaan */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                <Briefcase size={18} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Pekerjaan</div>
                <div className="text-xs font-semibold text-slate-800">
                  {member.occupation || 'Wiraswasta'}
                </div>
              </div>
            </div>

            {/* 5. Pendidikan */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                <GraduationCap size={18} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Pendidikan</div>
                <div className="text-xs font-semibold text-slate-800">
                  {member.education || 'S1'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hubungan Keluarga Card matching screenshot */}
        <div 
          onClick={() => {
            // Find parent if exists
            const parent = allMembers.find((m) => m.id === member.parentId || (member.parentsText && m.name.includes(member.parentsText.split(' ')[0])));
            if (parent) {
              onSelectMember(parent);
            }
          }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100/90 flex items-center justify-between cursor-pointer hover:bg-stone-50/50 transition-colors group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100/60">
              <Network size={20} className="stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[12px] font-bold text-slate-800 leading-tight">Hubungan Keluarga</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {member.generation === 1 
                  ? 'Sesepuh Pendiri Bani H. Nukhin'
                  : `Anak dari ${member.parentsText || 'H. Nukhin & Hj. Siti Aminah'}`}
              </div>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-700 transition-colors" />
        </div>

        {/* Anggota Keluarga Lainnya horizontal gallery matching screenshot */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-xs font-bold text-slate-800">Anggota Keluarga Lainnya</h3>
            <button
              onClick={onBack}
              className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700 flex items-center gap-0.5"
            >
              Lihat Semua <ChevronRight size={12} />
            </button>
          </div>

          {/* Horizontal avatar scroll row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 px-1">
            {otherMembers.slice(0, 6).map((other) => (
              <button
                key={other.id}
                onClick={() => onSelectMember(other)}
                className="flex flex-col items-center min-w-[56px] text-center group active:scale-95 transition-transform"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-600/30 shadow-xs group-hover:ring-emerald-600 transition-all bg-white">
                  <img
                    src={other.avatarUrl}
                    alt={other.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-700 mt-1 truncate max-w-[60px]">
                  {other.nickname || other.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-lg animate-in fade-in">
          {showToast}
        </div>
      )}
    </div>
  );
};
