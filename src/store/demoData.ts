import type { Category, Card, Goal, Budget, Transaction } from '@/types';

export const DEMO_CATEGORIES: Category[] = [
  { id: 'cat_1', name: 'Housing', icon: 'home', color: 'var(--primary)', type: 'expense' },
  { id: 'cat_2', name: 'Food', icon: 'coffee', color: 'var(--warning)', type: 'expense' },
  { id: 'cat_3', name: 'Salary', icon: 'briefcase', color: 'var(--income)', type: 'income' },
  { id: 'cat_4', name: 'Entertainment', icon: 'film', color: 'var(--accent)', type: 'expense' },
];

export const DEMO_CARDS: Card[] = [
  { id: 'card_1', label: 'Primary Checking', type: 'debit', last4: '4242', balance: 543200, expiry: '12/28', frozen: false },
  { id: 'card_2', label: 'Rewards Credit', type: 'credit', last4: '8811', balance: -125000, limit: 500000, expiry: '09/27', frozen: false },
];

export const DEMO_GOALS: Goal[] = [
  { id: 'goal_1', name: 'Emergency Fund', target: 1000000, current: 450000, color: 'var(--primary)', contributions: [] },
  { id: 'goal_2', name: 'Vacation', target: 250000, current: 100000, color: 'var(--accent)', contributions: [] },
];

export const DEMO_BUDGETS: Budget[] = [
  { id: 'bud_1', categoryId: 'cat_2', limit: 60000, period: 'monthly', month: new Date().toISOString().slice(0, 7) },
];

export const DEMO_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn_1',
    type: 'income',
    amount: 500000,
    categoryId: 'cat_3',
    accountId: 'card_1',
    note: 'Monthly Salary',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'txn_2',
    type: 'expense',
    amount: 150000,
    categoryId: 'cat_1',
    accountId: 'card_1',
    note: 'Rent',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'txn_3',
    type: 'expense',
    amount: 3200,
    categoryId: 'cat_2',
    accountId: 'card_2',
    note: 'Coffee',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];
