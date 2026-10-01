import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  Layers, 
  Plus, 
  Heart, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  ChevronRight,
  Filter
} from 'lucide-react';
import { FamilyMember } from '../types';

interface FamilyTreeViewProps {
  members: FamilyMember[];
  onBack: () => void;
  onSelectMember: (member: FamilyMember) => void;
  onAddMember: () => void;
  initialSubTab?: 'pohon' | 'daftar' | 'lini';
}

export const FamilyTreeView: React.FC<FamilyTreeViewProps> = ({
  members,
  onBack,
  onSelectMember,
  onAddMember,
  initialSubTab = 'pohon',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'pohon' | 'daftar' | 'lini'>(initialSubTab);

  React.useEffect(() => {
    setActiveSubTab(initialSubTab);
  }, [initialSubTab]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenFilter, setSelectedGenFilter] = useState<number | 'all'>('all');
  const [showMenuDropdown, setShowMenuDropdown] = useState<boolean>(false);

  // Group members by generation
  const gen1 = members.filter((m) => m.generation === 1);
  const gen2 = members.filter((m) => m.generation === 2);
  const gen3 = members.filter((m) => m.generation === 3);

  // Filtered members for "Daftar Anggota" tab
  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.occupation && m.occupation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.address && m.address.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGen = selectedGenFilter === 'all' || m.generation === selectedGenFilter;
    return matchesSearch && matchesGen;
  });

  return (
    <div className="relative min-h-full flex flex-col bg-[#F8F6F0]">
      {/* Top Header App Bar (Deep Forest Green) */}
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
            <div>
              <h1 className="text-base font-bold text-white leading-tight">Pohon Silsilah</h1>
              <p className="text-[11px] text-emerald-200/90 font-medium">Keluarga Besar Bani H. Nukhin</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 relative">
            <button
              onClick={() => {
                setActiveSubTab(activeSubTab === 'pohon' ? 'lini' : 'pohon');
              }}
              title="Ganti Tampilan Struktur"
              className="p-1.5 text-white/90 hover:text-white rounded-full hover:bg-white/10 active:scale-95 transition-all"
            >
              <Layers size={19} className="stroke-[2]" />
            </button>
            <button
              onClick={() => setShowMenuDropdown(!showMenuDropdown)}
              className="p-1.5 text-white/90 hover:text-white rounded-full hover:bg-white/10 active:scale-95 transition-all"
            >
              <MoreVertical size={19} className="stroke-[2]" />
            </button>

            {/* Menu Dropdown */}
            {showMenuDropdown && (
              <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 text-slate-800 text-xs animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => {
                    setZoomLevel(1);
                    setShowMenuDropdown(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Reset Zoom</span>
                  <RotateCcw size={14} className="text-slate-400" />
                </button>
                <button
                  onClick={() => {
                    onAddMember();
                    setShowMenuDropdown(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Tambah Anggota</span>
                  <Plus size={14} className="text-slate-400" />
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button
                  onClick={() => {
                    window.print();
                    setShowMenuDropdown(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-emerald-700 font-medium"
                >
                  Cetak Silsilah (PDF)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3 Sub Navigation Tabs (Pill style matching screenshot) */}
        <div className="mt-3.5 flex items-center bg-[#133524] p-1 rounded-full text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('pohon')}
            className={`flex-1 py-1.5 px-3 rounded-full text-center transition-all ${
              activeSubTab === 'pohon'
                ? 'bg-[#1e5631] text-white shadow-sm'
                : 'text-emerald-100/70 hover:text-white'
            }`}
          >
            Pohon Keluarga
          </button>
          <button
            onClick={() => setActiveSubTab('daftar')}
            className={`flex-1 py-1.5 px-3 rounded-full text-center transition-all ${
              activeSubTab === 'daftar'
                ? 'bg-[#1e5631] text-white shadow-sm'
                : 'text-emerald-100/70 hover:text-white'
            }`}
          >
            Daftar Anggota
          </button>
          <button
            onClick={() => setActiveSubTab('lini')}
            className={`flex-1 py-1.5 px-3 rounded-full text-center transition-all ${
              activeSubTab === 'lini'
                ? 'bg-[#1e5631] text-white shadow-sm'
                : 'text-emerald-100/70 hover:text-white'
            }`}
          >
            Lini Keturunan
          </button>
        </div>
      </div>

      {/* Main Content Area based on Tab */}
      {activeSubTab === 'pohon' && (
        <div className="relative flex-1 overflow-auto bg-[#e9f2eb] select-none min-h-[580px]">
          {/* Background image canvas */}
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-50"
            style={{
              backgroundImage: `url('/src/assets/images/tree_bg_canvas_1790816097060.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#dff0e4]/80 pointer-events-none" />

          {/* Zoom Floating Toolbar (Top Right) */}
          <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 bg-white/90 backdrop-blur-md rounded-xl p-1 shadow-md border border-emerald-100">
            <button
              onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 1.4))}
              className="p-1.5 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Perbesar"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.75))}
              className="p-1.5 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Perkecil"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
              title="Reset"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Interactive Tree View with Zoom Support */}
          <div 
            className="relative z-10 p-4 transition-transform duration-200 origin-top flex flex-col items-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* GENERASI 1: Pasangan Sesepuh (H. Nukhin & Hj. Siti Aminah) */}
            <div className="relative flex items-center justify-center gap-4 mt-2 mb-8">
              {/* Grandfather: H. Nukhin */}
              {gen1[0] && (
                <div
                  onClick={() => onSelectMember(gen1[0])}
                  className="group cursor-pointer flex flex-col items-center text-center transition-transform hover:scale-105"
                >
                  <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-br from-amber-200 via-emerald-200 to-amber-300 shadow-md ring-2 ring-emerald-600/40 overflow-hidden bg-white">
                    <img
                      src={gen1[0].avatarUrl}
                      alt={gen1[0].name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="mt-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-xs border border-emerald-100 max-w-[110px]">
                    <div className="font-bold text-[11px] text-slate-800 leading-tight truncate">
                      {gen1[0].name}
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium">
                      ({gen1[0].birthYear} - {gen1[0].deathYear || 'kini'})
                    </div>
                  </div>
                </div>
              )}

              {/* Heart Connector Badge */}
              <div className="w-7 h-7 rounded-full bg-white shadow-md border border-rose-200 flex items-center justify-center z-10 -my-4 animate-pulse">
                <Heart size={14} className="fill-rose-500 text-rose-500" />
              </div>

              {/* Grandmother: Hj. Siti Aminah */}
              {gen1[1] && (
                <div
                  onClick={() => onSelectMember(gen1[1])}
                  className="group cursor-pointer flex flex-col items-center text-center transition-transform hover:scale-105"
                >
                  <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-br from-amber-200 via-emerald-200 to-amber-300 shadow-md ring-2 ring-emerald-600/40 overflow-hidden bg-white">
                    <img
                      src={gen1[1].avatarUrl}
                      alt={gen1[1].name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="mt-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-xs border border-emerald-100 max-w-[110px]">
                    <div className="font-bold text-[11px] text-slate-800 leading-tight truncate">
                      {gen1[1].name}
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium">
                      ({gen1[1].birthYear} - {gen1[1].deathYear || 'kini'})
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tree Branch Line System: Gen 1 to Gen 2 */}
            <div className="relative w-full max-w-[340px] h-8 -mt-6 mb-2">
              <svg className="w-full h-full" viewBox="0 0 340 32" fill="none">
                {/* Vertical trunk line from center */}
                <path d="M 170 0 L 170 16" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Horizontal branch bar */}
                <path d="M 38 16 L 302 16" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
                {/* Downward drop lines to 4 children */}
                <path d="M 38 16 L 38 32" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
                <path d="M 126 16 L 126 32" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
                <path d="M 214 16 L 214 32" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
                <path d="M 302 16 L 302 32" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
                {/* Decorative leaves */}
                <circle cx="170" cy="16" r="3" fill="#66bb6a" />
                <circle cx="104" cy="16" r="2.5" fill="#81c784" />
                <circle cx="236" cy="16" r="2.5" fill="#81c784" />
              </svg>
            </div>

            {/* GENERASI 2: 4 Anak (Ahmad, Siti Rahayu, Budi Santoso, Ani Lestari) */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-[380px] mb-8">
              {gen2.slice(0, 4).map((member) => (
                <div
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className="group cursor-pointer flex flex-col items-center text-center transition-transform hover:scale-105"
                >
                  <div className="w-13 h-13 rounded-full p-0.5 bg-white shadow-sm ring-2 ring-emerald-500/50 overflow-hidden">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="mt-1 bg-white/95 px-1.5 py-1 rounded-lg shadow-2xs border border-emerald-100/80 w-full max-w-[82px]">
                    <div className="font-bold text-[10px] text-slate-800 leading-tight truncate">
                      {member.nickname || member.name.split(' ')[0]}
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium">
                      ({member.birthYear})
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tree Branch Line System: Gen 2 to Gen 3 */}
            <div className="relative w-full max-w-[340px] h-8 -mt-6 mb-2">
              <svg className="w-full h-full" viewBox="0 0 340 32" fill="none">
                <path d="M 170 0 L 170 16" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
                <path d="M 38 16 L 302 16" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
                <path d="M 38 16 L 38 32" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
                <path d="M 126 16 L 126 32" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
                <path d="M 214 16 L 214 32" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
                <path d="M 302 16 L 302 32" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="170" cy="16" r="2.5" fill="#4caf50" />
              </svg>
            </div>

            {/* GENERASI 3: 4 Cucu (Rizky, Dewi, Aldo, Nisa) */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-[380px] mb-6">
              {gen3.slice(0, 4).map((member) => (
                <div
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className="group cursor-pointer flex flex-col items-center text-center transition-transform hover:scale-105"
                >
                  <div className="w-13 h-13 rounded-full p-0.5 bg-white shadow-sm ring-2 ring-emerald-400/50 overflow-hidden">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="mt-1 bg-white/95 px-1.5 py-1 rounded-lg shadow-2xs border border-emerald-100/80 w-full max-w-[82px]">
                    <div className="font-bold text-[10px] text-slate-800 leading-tight truncate">
                      {member.nickname || member.name.split(' ')[0]}
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium">
                      ({member.birthYear})
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick helper note */}
            <div className="text-center text-[11px] text-emerald-800/80 font-medium bg-white/70 backdrop-blur-xs py-1.5 px-4 rounded-full border border-emerald-100/60 shadow-2xs">
              Ketuk anggota keluarga untuk melihat data lengkap & garis keturunan
            </div>
          </div>

          {/* Floating Action Button (+) matching screenshot bottom right */}
          <button
            onClick={onAddMember}
            className="absolute bottom-5 right-5 z-30 w-13 h-13 rounded-full bg-[#1b4332] hover:bg-[#143628] text-white flex items-center justify-center shadow-lg shadow-emerald-950/20 active:scale-95 transition-transform"
            aria-label="Tambah Anggota Silsilah"
          >
            <Plus size={26} className="stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* SUBTAB 2: DAFTAR ANGGOTA (Directory) */}
      {activeSubTab === 'daftar' && (
        <div className="flex-1 p-4 pb-16 overflow-y-auto">
          {/* Search bar */}
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, kota, pekerjaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all shadow-2xs"
            />
          </div>

          {/* Generation filter chips */}
          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] text-slate-500 font-medium mr-1 flex items-center gap-1">
              <Filter size={12} /> Generasi:
            </span>
            <button
              onClick={() => setSelectedGenFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedGenFilter === 'all'
                  ? 'bg-[#1e5631] text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Semua ({members.length})
            </button>
            <button
              onClick={() => setSelectedGenFilter(1)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedGenFilter === 1
                  ? 'bg-[#1e5631] text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Gen 1 (Sesepuh)
            </button>
            <button
              onClick={() => setSelectedGenFilter(2)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedGenFilter === 2
                  ? 'bg-[#1e5631] text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Gen 2 (Anak)
            </button>
            <button
              onClick={() => setSelectedGenFilter(3)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedGenFilter === 3
                  ? 'bg-[#1e5631] text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Gen 3 (Cucu)
            </button>
          </div>

          {/* Members List */}
          <div className="space-y-2.5">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => onSelectMember(member)}
                className="bg-white rounded-2xl p-3 shadow-2xs border border-slate-100 flex items-center justify-between hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-500/20 shrink-0 bg-slate-100">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-[13px]">{member.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {member.roleLabel}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Lahir: {member.birthYear} • {member.occupation || 'Wiraswasta'}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[200px]">
                      {member.address}
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-700 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: LINI KETURUNAN (Branch View) */}
      {activeSubTab === 'lini' && (
        <div className="flex-1 p-4 pb-16 overflow-y-auto">
          <div className="bg-emerald-800 text-white rounded-2xl p-4 mb-4 shadow-sm">
            <h3 className="font-bold text-sm">Garis Keturunan Utama Bani H. Nukhin</h3>
            <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
              Berasal dari pasangan H. Nukhin & Hj. Siti Aminah, menurunkan 4 pilar keluarga besar dengan generasi cucu dan cicit yang tersebar.
            </p>
          </div>

          <div className="space-y-4">
            {gen2.map((branchHead, index) => {
              const children = gen3.filter((c) => c.parentId === branchHead.id || c.parentsText?.includes(branchHead.name.split(' ')[0]));
              return (
                <div key={branchHead.id} className="bg-white rounded-2xl p-4 shadow-2xs border border-stone-100">
                  <div 
                    onClick={() => onSelectMember(branchHead)}
                    className="flex items-center justify-between cursor-pointer pb-3 border-b border-stone-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-emerald-600/40">
                        <img src={branchHead.avatarUrl} alt={branchHead.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-[13px] text-slate-800">
                          Jalur {index + 1}: {branchHead.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {branchHead.occupation} • {branchHead.address.split(',')[1] || branchHead.address}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      {children.length} Keturunan
                    </span>
                  </div>

                  {/* Descendants list */}
                  <div className="mt-3 pl-4 border-l-2 border-emerald-200/80 space-y-2">
                    {children.length > 0 ? (
                      children.map((child) => (
                        <div
                          key={child.id}
                          onClick={() => onSelectMember(child)}
                          className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden">
                              <img src={child.avatarUrl} alt={child.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xs font-medium text-slate-700">{child.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">({child.birthYear})</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-400 italic py-1">Belum ada data cucu terdaftar</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
