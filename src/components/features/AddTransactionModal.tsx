import { useState } from 'react';
import type { FormEvent } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useFinanceStore } from '@/store/useFinanceStore';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTransactionModal({ open, onOpenChange }: Props) {
  const { addTransaction, categories, cards } = useFinanceStore();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [accountId, setAccountId] = useState('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!amount || !categoryId || !accountId) return;
    
    addTransaction({
      type,
      amount: Math.round(parseFloat(amount) * 100), // convert to cents
      categoryId,
      accountId,
      note,
      date: new Date().toISOString(),
    });
    
    onOpenChange(false);
    setAmount('');
    setNote('');
  };
  
  const availableCategories = categories.filter(c => c.type === 'both' || c.type === type);

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Add Transaction">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Button type="button" variant={type === 'expense' ? 'primary' : 'ghost'} onClick={() => setType('expense')}>Expense</Button>
          <Button type="button" variant={type === 'income' ? 'primary' : 'ghost'} onClick={() => setType('income')}>Income</Button>
        </div>
        
        <div>
          <label htmlFor="amount-input" className="text-sm font-medium text-textSecondary mb-1.5 block">Amount</label>
          <Input id="amount-input" type="number" step="0.01" min="0" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>
        
        <div>
          <label htmlFor="category-select" className="text-sm font-medium text-textSecondary mb-1.5 block">Category</label>
          <select id="category-select" className="w-full h-10 bg-surface border border-borderSubtle rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent text-textPrimary" value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
            <option value="" disabled>Select Category</option>
            {availableCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        
        <div>
          <label htmlFor="account-select" className="text-sm font-medium text-textSecondary mb-1.5 block">Account</label>
          <select id="account-select" className="w-full h-10 bg-surface border border-borderSubtle rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent text-textPrimary" value={accountId} onChange={e => setAccountId(e.target.value)} required>
            <option value="" disabled>Select Account</option>
            {cards.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        
        <div>
          <label htmlFor="note-input" className="text-sm font-medium text-textSecondary mb-1.5 block">Note</label>
          <Input id="note-input" placeholder="What was this for?" value={note} onChange={e => setNote(e.target.value)} />
        </div>
        
        <div className="pt-4 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" variant="primary">Save Transaction</Button>
        </div>
      </form>
    </Modal>
  );
}
