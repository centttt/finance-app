import { forwardRef, type HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-elevated text-textPrimary border border-borderSubtle',
      success: 'bg-[#22C55E]/15 text-success border border-success/20',
      danger: 'bg-[#EF4444]/15 text-danger border border-danger/20',
      warning: 'bg-[#F59E0B]/15 text-warning border border-warning/20',
      info: 'bg-[#38BDF8]/15 text-info border border-info/20',
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-sm px-2 py-0.5 text-[13px] font-medium transition-colors ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
