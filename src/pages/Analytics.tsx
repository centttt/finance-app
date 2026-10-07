import { useFinanceStore } from '@/store/useFinanceStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function Analytics() {
  const { transactions, categories } = useFinanceStore();

  const { monthlyData, categoryData } = useMemo(() => {
    const mData = [{ name: 'This Month', income: 0, expense: 0 }];
    const catMap: Record<string, number> = {};

    transactions.forEach(t => {
      const amt = t.amount / 100;
      if (t.type === 'income') {
        mData[0].income += amt;
      } else {
        mData[0].expense += amt;
        catMap[t.categoryId] = (catMap[t.categoryId] || 0) + amt;
      }
    });

    const cData = Object.entries(catMap).map(([id, value]) => {
      const cat = categories.find(c => c.id === id);
      return { name: cat?.name || 'Unknown', value, color: cat?.color || '#888' };
    });

    return { monthlyData: mData, categoryData: cData };
  }, [transactions, categories]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-textSecondary text-sm mt-1">Visualize your income and spending trends.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader><CardTitle>Income vs Expense</CardTitle></CardHeader>
          <CardContent className="h-80 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip cursor={{fill: 'var(--hover)'}} contentStyle={{backgroundColor: 'var(--elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-primary)'}} />
                <Bar dataKey="income" fill="var(--success)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="var(--danger)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Expense Distribution</CardTitle></CardHeader>
          <CardContent className="h-80">
            {categoryData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-textMuted">No expense data.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5}>
                    {categoryData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{backgroundColor: 'var(--elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-primary)'}} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
