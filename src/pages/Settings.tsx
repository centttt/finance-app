import { useFinanceStore } from '@/store/useFinanceStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Settings() {
  const { settings, updateSettings, clearAllData } = useFinanceStore();

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-textSecondary text-sm mt-1">Manage your app preferences.</p>
      </div>
      
      <Card>
        <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-borderSubtle">
            <div>
              <label htmlFor="currency-select" className="font-medium block">Currency</label>
              <p className="text-sm text-textSecondary">Your preferred base currency.</p>
            </div>
            <select 
              id="currency-select"
              value={settings.currency} 
              onChange={e => updateSettings({ currency: e.target.value })}
              className="h-10 bg-surface border border-borderSubtle rounded-md px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent text-textPrimary"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-borderSubtle">
            <div>
              <label htmlFor="date-format-select" className="font-medium block">Date Format</label>
              <p className="text-sm text-textSecondary">How dates should be displayed.</p>
            </div>
            <select 
              id="date-format-select"
              value={settings.dateFormat} 
              onChange={e => updateSettings({ dateFormat: e.target.value })}
              className="h-10 bg-surface border border-borderSubtle rounded-md px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent text-textPrimary"
            >
              <option value="MMM dd, yyyy">Oct 07, 2026</option>
              <option value="MM/dd/yyyy">10/07/2026</option>
              <option value="dd/MM/yyyy">07/10/2026</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-danger">Danger Zone</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-textSecondary mb-4">Permanently delete all data from this device. This cannot be undone.</p>
          <Button variant="danger" onClick={() => {
            if(window.confirm('Are you sure you want to wipe all local data?')) clearAllData();
          }}>
            Wipe All Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
