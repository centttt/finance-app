import { Menu, Search, User } from 'lucide-react';
import type { HTMLAttributes } from 'react';

export interface TopBarProps extends HTMLAttributes<HTMLElement> {
  onToggleSidebar: () => void;
  title?: string;
}

export function TopBar({ onToggleSidebar, title = 'Dashboard', className = '', ...props }: TopBarProps) {
  return (
    <header
      className={`h-48 flex items-center justify-between px-4 lg:px-8 bg-base/80 backdrop-blur-md border-b border-borderSubtle sticky top-0 z-20 ${className}`}
      {...props}
    >
      <div className="flex items-center gap-4">
        <button
          className="p-2.5 rounded-md hover:bg-hover text-textSecondary hover:text-textPrimary transition-colors focus:outline-none focus:ring-2 focus:ring-accent shrink-0"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-textPrimary hidden sm:block tracking-tight">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted" />
          <input
            type="text"
            aria-label="Search"
            placeholder="Search..."
            className="h-10 w-72 bg-surface border border-borderSubtle rounded-full pl-10 pr-4 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
          />
        </div>
        <select 
          aria-label="Time period filter"
          className="h-10 bg-surface border border-borderSubtle rounded-md px-4 py-2 text-sm font-medium text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent hidden sm:block cursor-pointer"
        >
          <option>This Month</option>
          <option>Last Month</option>
          <option>YTD</option>
        </select>
        <button className="w-10 h-10 p-0 flex items-center justify-center rounded-full bg-surface border border-borderSubtle overflow-hidden shrink-0 hover:bg-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent">
          <User className="w-5 h-5 text-textSecondary" />
        </button>
      </div>
    </header>
  );
}
