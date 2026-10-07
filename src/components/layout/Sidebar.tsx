import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, Wallet, Target, CreditCard, BarChart3, Settings } from 'lucide-react';
import type { HTMLAttributes } from 'react';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/budget', label: 'Budget', icon: Wallet },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/cards', label: 'Cards', icon: CreditCard },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  collapsed: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ collapsed, onCloseMobile, className = '', ...props }: SidebarProps) {
  return (
    <aside
      className={`flex flex-col bg-surface border-r border-borderSubtle transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[240px]'
        } ${className}`}
      {...props}
    >
      <div className="flex items-center h-48 px-4 border-b border-borderSubtle shrink-0">
        <div className="flex items-center gap-3 overflow-hidden text-primary font-bold text-lg tracking-tight">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white shrink-0">
            V
          </div>
          {!collapsed && <span>VM Solutionss</span>}
        </div>
      </div>

      <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto overflow-x-hidden px-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onCloseMobile}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150 relative
              ${isActive
                ? 'bg-primarySubtle text-primary'
                : 'text-textSecondary hover:bg-hover hover:text-textPrimary'
              }
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/4 bg-primary rounded-r-md" />
                )}
                <item.icon className={`shrink-0 w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                {!collapsed && <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}

        <div className="my-2 border-t border-borderSubtle mx-2" />

        <NavLink
          to="/settings"
          onClick={onCloseMobile}
          className={({ isActive }) => `
            flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150 relative
            ${isActive
              ? 'bg-primarySubtle text-primary'
              : 'text-textSecondary hover:bg-hover hover:text-textPrimary'
            }
          `}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/4 bg-primary rounded-r-md" />
              )}
              <Settings className={`shrink-0 w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
              {!collapsed && <span className="font-medium text-sm whitespace-nowrap">Settings</span>}
            </>
          )}
        </NavLink>
      </nav>
    </aside>
  );
}
