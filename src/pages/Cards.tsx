import { useFinanceStore } from '@/store/useFinanceStore';
import { Badge } from '@/components/ui/Badge';

export default function Cards() {
  const { cards } = useFinanceStore();
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment Methods</h1>
        <p className="text-textSecondary text-sm mt-1">Manage your active debit and credit cards.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(card => (
          <div key={card.id} className="p-6 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-borderSubtle shadow-xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="flex justify-between items-center mb-10 relative z-10">
              <span className="font-semibold text-lg">{card.label}</span>
              <Badge variant={card.type === 'credit' ? 'warning' : 'info'} className="bg-black/40 border-none">{card.type}</Badge>
            </div>
            <div className="text-3xl font-bold tracking-widest mb-4 relative z-10 font-mono">
              **** **** **** {card.last4}
            </div>
            <div className="flex justify-between text-sm text-slate-300 relative z-10">
              <div className="flex flex-col">
                <span className="text-xs uppercase opacity-70">Balance</span>
                <span className="font-medium">${(card.balance / 100).toFixed(2)}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs uppercase opacity-70">Expires</span>
                <span className="font-medium">{card.expiry}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
