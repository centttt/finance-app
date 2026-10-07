import { useFinanceStore } from '@/store/useFinanceStore';
import { Card, CardContent } from '@/components/ui/Card';

export default function Goals() {
  const { goals } = useFinanceStore();
  
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Savings Goals</h1>
          <p className="text-textSecondary text-sm mt-1">Track your progress towards financial goals.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          return (
            <Card key={goal.id}>
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-lg">{goal.name}</h3>
                <div className="text-3xl font-bold tracking-tight">
                  ${(goal.current / 100).toFixed(2)}
                </div>
                <div className="flex justify-between text-sm text-textSecondary">
                  <span>Progress</span>
                  <span>{progress.toFixed(1)}% of ${(goal.target / 100).toFixed(2)}</span>
                </div>
                <div className="w-full h-2 bg-surface border border-borderSubtle rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500" 
                    style={{ width: `${progress}%`, backgroundColor: goal.color }} 
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
