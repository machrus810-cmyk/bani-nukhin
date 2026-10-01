export type Gender = 'male' | 'female';
export type MemberStatus = 'alive' | 'deceased';
export type MemberRole = 'Kakek' | 'Nenek' | 'Ayah' | 'Ibu' | 'Anak' | 'Cucu' | 'Cicit';

export interface FamilyMember {
  id: string;
  name: string;
  nickname?: string;
  generation: number; // 1 = H. Nukhin, 2 = Anak, 3 = Cucu, 4 = Cicit
  roleLabel: string; // 'Pendiri / Kakek', 'Anak', 'Cucu', etc.
  birthYear: number;
  deathYear?: number;
  birthDateFull?: string;
  status: MemberStatus;
  gender: Gender;
  address: string;
  phone: string;
  occupation: string;
  education: string;
  avatarUrl: string;
  avatarBgColor?: string;
  parentId?: string;
  parentsText?: string;
  spouseId?: string;
  spouseText?: string;
  notes?: string;
}

export type AgendaCategory = 'Semua' | 'Penting' | 'Rutin' | 'Acara';

export interface AgendaItem {
  id: string;
  title: string;
  dateTime: string;
  dateRaw: string;
  location?: string;
  category: 'Penting' | 'Rutin' | 'Acara';
  description?: string;
  organizer?: string;
}

export type TransactionType = 'in' | 'out';

export interface CashTransaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: TransactionType;
  category: string;
  iconName: string;
  note?: string;
}

export type PaymentStatus = 'Lunas' | 'Belum Bayar';

export interface IuranRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberAvatar: string;
  amount: number;
  period: string; // e.g. "April 2026"
  status: PaymentStatus;
  paidDate?: string;
}

export interface ActivityLog {
  id: string;
  iconType: 'user' | 'calendar' | 'cash' | 'edit';
  description: string;
  timeAgo: string;
}
