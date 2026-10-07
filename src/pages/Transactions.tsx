import { useState, useMemo } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowDownRight, ArrowUpRight, Search, Filter } from 'lucide-react';
import { AddTransactionModal } from '@/components/features/AddTransactionModal';

export default function Transactions() {
  const { transactions, categories } = useFinanceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((txn) => {
        const matchesSearch = txn.note?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || txn.type === typeFilter;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchTerm, typeFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-textSecondary text-sm mt-1">Manage and view your transaction history.</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>Add Transaction</Button>
      </div>

      <Card>
        <CardHeader className="border-b border-borderSubtle pb-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
              <Input 
                placeholder="Search transactions..." 
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              <Button 
                variant={typeFilter === 'all' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setTypeFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={typeFilter === 'income' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setTypeFilter('income')}
              >
                Income
              </Button>
              <Button 
                variant={typeFilter === 'expense' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => setTypeFilter('expense')}
              >
                Expense
              </Button>
              <div className="w-px h-6 bg-borderSubtle mx-2" />
              <Button variant="ghost" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-textSecondary uppercase bg-surface">
                <tr>
                  <th className="px-4 py-3 font-medium rounded-tl-lg">Transaction</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right rounded-tr-lg">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderSubtle">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-textMuted">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((txn) => {
                    const cat = categories.find(c => c.id === txn.categoryId);
                    return (
                      <tr key={txn.id} className="hover:bg-hover/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${txn.type === 'income' ? 'bg-success/10 text-success' : 'bg-surface border border-borderSubtle text-textSecondary'}`}>
                              {txn.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            </div>
                            <span className="font-medium text-textPrimary">{txn.note || 'Unnamed'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-textSecondary">
                          {new Date(txn.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="default" className="text-xs">
                            {cat?.name || 'Unknown'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="success" className="text-xs">Completed</Badge>
                        </td>
                        <td className={`px-4 py-3 text-right font-semibold tracking-tight ${txn.type === 'income' ? 'text-success' : 'text-textPrimary'}`}>
                          {txn.type === 'income' ? '+' : '-'}${(txn.amount / 100).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <AddTransactionModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
