import { useFinanceStore } from '@/store/useFinanceStore';
import { Card, CardContent } from '@/components/ui/Card';
import { useMemo } from 'react';

const CURRENT_MONTH = new Date().toISOString().slice(0, 7);

export default function Budget() {
  const { budgets, categories, transactions } = useFinanceStore();
  
  const budgetProgress = useMemo(() => {
    return budgets.map(b => {
      const category = categories.find(c => c.id === b.categoryId);
      const spent = transactions
        .filter(t => t.categoryId === b.categoryId && t.type === 'expense' && t.date.startsWith(CURRENT_MONTH))
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...b, categoryName: category?.name || 'Unknown', spent, color: category?.color || 'var(--primary)' };
    });
  }, [budgets, categories, transactions]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Budgets</h1>
          <p className="text-textSecondary text-sm mt-1">Monitor your monthly spending limits.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgetProgress.map(bp => {
          const progress = Math.min((bp.spent / bp.limit) * 100, 100);
          const isWarning = progress > 85;
          return (
            <Card key={bp.id}>
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{bp.categoryName}</span>
                  <span className="text-sm font-medium">
                    ${(bp.spent / 100).toFixed(2)} / ${(bp.limit / 100).toFixed(2)}
                  </span>
                </div>
                <div className="w-full h-3 bg-surface border border-borderSubtle rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500" 
                    style={{ width: `${progress}%`, backgroundColor: isWarning ? 'var(--danger)' : bp.color }} 
                  />
                </div>
                <p className="text-xs text-textSecondary">
                  {progress.toFixed(1)}% used {isWarning && <span className="text-danger ml-2">Approaching limit!</span>}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
