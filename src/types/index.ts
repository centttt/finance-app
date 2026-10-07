export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number; // stored in minor units (cents)
  categoryId: string;
  accountId: string;
  note?: string;
  date: string; // ISO 8601
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense' | 'both';
};

export type Budget = {
  id: string;
  categoryId: string;
  limit: number;
  period: 'monthly';
  month: string; // YYYY-MM
};

export type Contribution = {
  id: string;
  amount: number;
  date: string;
};

export type Goal = {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline?: string;
  color: string;
  contributions: Contribution[];
};

export type Card = {
  id: string;
  label: string;
  type: 'debit' | 'credit';
  last4: string;
  balance: number;
  limit?: number;
  expiry: string;
  frozen: boolean;
};

export type Settings = {
  currency: string;
  locale: string;
  dateFormat: string;
  accent: string;
  firstDayOfMonth: number;
};
