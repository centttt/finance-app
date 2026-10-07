import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Transaction, Category, Budget, Goal, Card, Settings } from '@/types';
import { DEMO_CATEGORIES, DEMO_CARDS, DEMO_GOALS, DEMO_BUDGETS, DEMO_TRANSACTIONS } from './demoData';

interface FinanceState {
  schemaVersion: number;
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  goals: Goal[];
  cards: Card[];
  settings: Settings;
  
  // Actions
  addTransaction: (txn: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTransaction: (id: string, txn: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  
  addCategory: (category: Omit<Category, 'id'>) => void;
  
  updateSettings: (settings: Partial<Settings>) => void;
  clearAllData: () => void;
}

const DEFAULT_SETTINGS: Settings = {
  currency: 'USD',
  locale: 'en-US',
  dateFormat: 'MMM dd, yyyy',
  accent: 'var(--primary)',
  firstDayOfMonth: 1,
};

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      schemaVersion: 1,
      transactions: DEMO_TRANSACTIONS,
      categories: DEMO_CATEGORIES,
      budgets: DEMO_BUDGETS,
      goals: DEMO_GOALS,
      cards: DEMO_CARDS,
      settings: DEFAULT_SETTINGS,

      addTransaction: (txn) => set((state) => ({
        transactions: [
          ...state.transactions,
          {
            ...txn,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ]
      })),

      updateTransaction: (id, updatedFields) => set((state) => ({
        transactions: state.transactions.map((t) => 
          t.id === id ? { ...t, ...updatedFields, updatedAt: new Date().toISOString() } : t
        )
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),

      addCategory: (category) => set((state) => ({
        categories: [
          ...state.categories,
          { ...category, id: crypto.randomUUID() }
        ]
      })),

      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      clearAllData: () => set(() => ({
        transactions: [],
        categories: DEMO_CATEGORIES, // Keep base categories
        budgets: [],
        goals: [],
        cards: [],
        settings: DEFAULT_SETTINGS,
      })),
    }),
    {
      name: 'vmsolutionss.finance.v1.store',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          return { ...(persistedState as Record<string, unknown>), schemaVersion: 1 };
        }
        return persistedState;
      },
    }
  )
);
