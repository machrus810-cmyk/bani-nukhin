/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNavBar, TabType } from './components/BottomNavBar';
import { DashboardView } from './components/DashboardView';
import { FamilyTreeView } from './components/FamilyTreeView';
import { MemberDetailView } from './components/MemberDetailView';
import { AgendaView } from './components/AgendaView';
import { CashflowView } from './components/CashflowView';
import { IuranView } from './components/IuranView';
import { SettingsView } from './components/SettingsView';
import { SidebarDrawer } from './components/SidebarDrawer';
import { AddMemberModal } from './components/AddMemberModal';
import { AddAgendaModal } from './components/AddAgendaModal';
import { AddTransactionModal } from './components/AddTransactionModal';
import { AddIuranModal } from './components/AddIuranModal';

import { 
  INITIAL_MEMBERS, 
  INITIAL_AGENDAS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_IURAN, 
  INITIAL_ACTIVITIES 
} from './data/familyData';
import { FamilyMember, AgendaItem, CashTransaction, IuranRecord, ActivityLog } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('beranda');
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  
  // App state
  const [members, setMembers] = useState<FamilyMember[]>(INITIAL_MEMBERS);
  const [agendas, setAgendas] = useState<AgendaItem[]>(INITIAL_AGENDAS);
  const [transactions, setTransactions] = useState<CashTransaction[]>(INITIAL_TRANSACTIONS);
  const [iuranList, setIuranList] = useState<IuranRecord[]>(INITIAL_IURAN);
  const [activities, setActivities] = useState<ActivityLog[]>(INITIAL_ACTIVITIES);

  // Modals & Drawers
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isAddAgendaOpen, setIsAddAgendaOpen] = useState(false);
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [txType, setTxType] = useState<'in' | 'out'>('in');
  const [isAddIuranOpen, setIsAddIuranOpen] = useState(false);

  // Handlers
  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedMember(null); // Clear member detail when navigating tabs
  };

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
  };

  const handleBackFromDetail = () => {
    setSelectedMember(null);
  };

  const handleAddMember = (newMember: FamilyMember) => {
    setMembers((prev) => [newMember, ...prev]);
    // Add to activity log
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        iconType: 'user',
        description: `${newMember.name} ditambahkan sebagai anggota keluarga`,
        timeAgo: 'Baru saja',
      },
      ...prev,
    ]);
  };

  const handleAddAgenda = (newAgenda: AgendaItem) => {
    setAgendas((prev) => [newAgenda, ...prev]);
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        iconType: 'calendar',
        description: `Acara ${newAgenda.title} telah dibuat`,
        timeAgo: 'Baru saja',
      },
      ...prev,
    ]);
  };

  const handleAddTransaction = (newTx: CashTransaction) => {
    setTransactions((prev) => [newTx, ...prev]);
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        iconType: 'cash',
        description: `Transaksi ${newTx.title} sebesar Rp ${newTx.amount.toLocaleString('id-ID')} dicatat`,
        timeAgo: 'Baru saja',
      },
      ...prev,
    ]);
  };

  const handleOpenAddTx = (type: 'in' | 'out') => {
    setTxType(type);
    setIsAddTxOpen(true);
  };

  const handleAddIuran = (newRecord: IuranRecord) => {
    setIuranList((prev) => [newRecord, ...prev]);
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        iconType: 'cash',
        description: `Iuran ${newRecord.memberName} periode ${newRecord.period} telah dicatat`,
        timeAgo: 'Baru saja',
      },
      ...prev,
    ]);
  };

  const handleToggleIuranStatus = (id: string) => {
    setIuranList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'Lunas' ? 'Belum Bayar' : 'Lunas';
          return {
            ...item,
            status: nextStatus,
            paidDate: nextStatus === 'Lunas' ? 'Hari ini' : undefined,
          };
        }
        return item;
      })
    );
  };

  return (
    <PhoneFrame>
      {/* Navigation Drawer */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectTab={handleSelectTab}
        activeTab={activeTab}
      />

      {/* Main View Router */}
      <div className="flex-1 overflow-y-auto">
        {selectedMember ? (
          <MemberDetailView
            member={selectedMember}
            allMembers={members}
            onBack={handleBackFromDetail}
            onSelectMember={handleSelectMember}
            onEditMember={(m) => {
              alert(`Edit data ${m.name} dapat disesuaikan pada silsilah`);
            }}
          />
        ) : (
          <>
            {activeTab === 'beranda' && (
              <DashboardView
                onNavigate={handleSelectTab}
                onOpenDrawer={() => setIsDrawerOpen(true)}
                activities={activities}
                totalMembersCount={members.length}
              />
            )}

            {activeTab === 'pohon' && (
              <FamilyTreeView
                key="pohon-tree"
                members={members}
                initialSubTab="pohon"
                onBack={() => handleSelectTab('beranda')}
                onSelectMember={handleSelectMember}
                onAddMember={() => setIsAddMemberOpen(true)}
              />
            )}

            {activeTab === 'anggota' && (
              <FamilyTreeView
                key="anggota-directory"
                members={members}
                initialSubTab="daftar"
                onBack={() => handleSelectTab('beranda')}
                onSelectMember={handleSelectMember}
                onAddMember={() => setIsAddMemberOpen(true)}
              />
            )}

            {activeTab === 'agenda' && (
              <AgendaView
                agendas={agendas}
                onBack={() => handleSelectTab('beranda')}
                onAddAgenda={() => setIsAddAgendaOpen(true)}
              />
            )}

            {activeTab === 'kas' && (
              <CashflowView
                transactions={transactions}
                onBack={() => handleSelectTab('beranda')}
                onAddTransaction={handleOpenAddTx}
              />
            )}

            {activeTab === 'iuran' && (
              <IuranView
                iuranList={iuranList}
                onBack={() => handleSelectTab('beranda')}
                onAddIuran={() => setIsAddIuranOpen(true)}
                onToggleStatus={handleToggleIuranStatus}
              />
            )}

            {activeTab === 'pengaturan' && (
              <SettingsView
                onBack={() => handleSelectTab('beranda')}
                membersCount={members.length}
              />
            )}
          </>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenMoreMenu={() => handleSelectTab('pengaturan')}
      />

      {/* Modals */}
      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onSave={handleAddMember}
        existingParents={members.filter((m) => m.generation <= 2)}
      />

      <AddAgendaModal
        isOpen={isAddAgendaOpen}
        onClose={() => setIsAddAgendaOpen(false)}
        onSave={handleAddAgenda}
      />

      <AddTransactionModal
        isOpen={isAddTxOpen}
        initialType={txType}
        onClose={() => setIsAddTxOpen(false)}
        onSave={handleAddTransaction}
      />

      <AddIuranModal
        isOpen={isAddIuranOpen}
        members={members}
        onClose={() => setIsAddIuranOpen(false)}
        onSave={handleAddIuran}
      />
    </PhoneFrame>
  );
}
