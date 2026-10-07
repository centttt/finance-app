import { useFinanceStore } from '@/store/useFinanceStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight, ArrowDownRight, Wallet, Target } from 'lucide-react';
import { useMemo } from 'react';

export default function Dashboard() {
  const { transactions, cards, goals } = useFinanceStore();

  const totalBalance = cards.reduce((acc, card) => acc + card.balance, 0);

  const { totalIncome, totalExpense } = useMemo(() => {
    return transactions.reduce(
      (acc, txn) => {
        if (txn.type === 'income') acc.totalIncome += txn.amount;
        else acc.totalExpense += txn.amount;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );
  }, [transactions]);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Balance */}
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4 pt-2">
              <span className="text-sm font-medium text-textSecondary">Total Balance</span>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-textPrimary">
              ${(totalBalance / 100).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        {/* Income */}
        <Card>
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4 pt-2">
              <span className="text-sm font-medium text-textSecondary">Total Income</span>
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-textPrimary">
              +${(totalIncome / 100).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        {/* Expenses */}
        <Card>
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4 pt-2">
              <span className="text-sm font-medium text-textSecondary">Total Expenses</span>
              <div className="w-8 h-8 rounded-full bg-danger/20 flex items-center justify-center text-danger">
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-textPrimary">
              -${(totalExpense / 100).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        {/* Goals Progress */}
        <Card>
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4 pt-2">
              <span className="text-sm font-medium text-textSecondary">Active Goals</span>
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <Target className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-textPrimary">
              {goals.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {recentTransactions.length === 0 ? (
                <div className="text-center py-8 text-textMuted">No recent transactions.</div>
              ) : (
                <div className="space-y-4">
                  {recentTransactions.map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-hover transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === 'income' ? 'bg-success/10 text-success' : 'bg-surface border border-borderSubtle text-textSecondary'}`}>
                          {txn.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-textPrimary">{txn.note || 'Transfer'}</p>
                          <p className="text-xs text-textSecondary">{new Date(txn.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className={`font-semibold tracking-tight ${txn.type === 'income' ? 'text-success' : 'text-textPrimary'}`}>
                        {txn.type === 'income' ? '+' : '-'}${(txn.amount / 100).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Cards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cards.map(card => (
                <div key={card.id} className="p-4 rounded-xl bg-gradient-to-br from-surface to-elevated border border-borderSubtle shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <span className="font-semibold text-sm tracking-wide">{card.label}</span>
                    <Badge variant={card.type === 'credit' ? 'warning' : 'info'}>{card.type}</Badge>
                  </div>
                  <div className="text-2xl font-bold tracking-tight mb-1 relative z-10">
                    ${(card.balance / 100).toFixed(2)}
                  </div>
                  <div className="text-sm text-textMuted relative z-10">
                    **** **** **** {card.last4}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
