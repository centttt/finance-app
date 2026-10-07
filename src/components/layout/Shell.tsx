import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/budget': 'Budget & Spending Limits',
  '/goals': 'Savings Goals',
  '/cards': 'Cards',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};

export function Shell() {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  const title = ROUTE_TITLES[location.pathname] || 'Dashboard';

  return (
    <div className="flex h-screen overflow-hidden bg-base text-textPrimary selection:bg-primarySubtle selection:text-primary">
      
      {/* Desktop Sidebar */}
      <Sidebar 
        collapsed={collapsed} 
        className="hidden md:flex z-30" 
      />
      
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-base/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
          collapsed={false} 
          onCloseMobile={() => setMobileOpen(false)}
          className="h-full w-[240px]" 
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopBar 
          title={title} 
          onToggleSidebar={() => {
            if (window.innerWidth < 768) {
              setMobileOpen(!mobileOpen);
            } else {
              setCollapsed(!collapsed);
            }
          }} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
