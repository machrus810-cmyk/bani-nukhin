import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Download, 
  Share2, 
  Bell, 
  Info, 
  ChevronRight, 
  User, 
  BookOpen,
  Database,
  Check
} from 'lucide-react';
import { FamilyMember } from '../types';

interface SettingsViewProps {
  onBack: () => void;
  membersCount: number;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onBack,
  membersCount,
}) => {
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Silsilah Keluarga Besar Bani H. Nukhin',
        text: 'Aplikasi Silsilah & Keuangan Keluarga Besar Bani H. Nukhin',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-full flex flex-col bg-[#F8F6F0] pb-16">
      {/* Top Header App Bar */}
      <div className="bg-[#173e2a] text-white px-4 pt-3 pb-3 relative z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 -ml-1 text-white/90 hover:text-white active:scale-95 transition-transform"
            aria-label="Kembali"
          >
            <ArrowLeft size={22} className="stroke-[2.2]" />
          </button>
          <h1 className="text-base font-bold text-white leading-tight">Pengaturan & Informasi</h1>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-stone-100 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-600/30">
            <img
              src="/src/assets/images/machrus_avatar_1790816108650.jpg"
              alt="Machrus"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
              }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-sm">Machrus</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Pengelola Silsilah Bani H. Nukhin</p>
          </div>
        </div>

        {/* Section 1: Data & Ekspor */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-stone-100 space-y-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            Data & Silsilah
          </h3>

          <button
            onClick={() => window.print()}
            className="w-full flex items-center justify-between py-2.5 px-1 hover:bg-stone-50 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Download size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Cetak Bagan Silsilah (PDF)</div>
                <div className="text-[11px] text-slate-500">Unduh atau cetak pohon keluarga</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>

          <button
            onClick={handleShare}
            className="w-full flex items-center justify-between py-2.5 px-1 hover:bg-stone-50 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Share2 size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  {copied ? 'Tautan Berhasil Disalin!' : 'Bagikan Aplikasi ke Keluarga'}
                </div>
                <div className="text-[11px] text-slate-500">Kirim link ke grup WhatsApp keluarga</div>
              </div>
            </div>
            {copied ? <Check size={16} className="text-emerald-600" /> : <ChevronRight size={16} className="text-slate-300" />}
          </button>
        </div>

        {/* Section 2: Notifikasi & Preferensi */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-stone-100 space-y-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            Preferensi
          </h3>

          <div className="flex items-center justify-between py-2.5 px-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Bell size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Pengingat Agenda</div>
                <div className="text-[11px] text-slate-500">Notifikasi acara & pengajian keluarga</div>
              </div>
            </div>
            <button
              onClick={() => setNotifEnabled(!notifEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                notifEnabled ? 'bg-emerald-700' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  notifEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Section 3: Tentang Bani H. Nukhin */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-stone-100">
          <div className="flex items-center gap-2 mb-2 text-emerald-800">
            <BookOpen size={17} />
            <h3 className="text-xs font-bold text-slate-800">Tentang Bani H. Nukhin</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Keluarga Besar Bani H. Nukhin didirikan oleh Almarhum H. Nukhin dan Almarhumah Hj. Siti Aminah. Paguyuban ini dibentuk guna mempererat tali silaturahmi, saling membantu antar keturunan, melestarikan nilai-nilai leluhur, dan menjaga transparansi kegiatan sosial serta kas keluarga.
          </p>

          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Versi Aplikasi: 2.4.0 (Rilis 2026)</span>
            <span>Total Anggota: {membersCount} Jiwa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
