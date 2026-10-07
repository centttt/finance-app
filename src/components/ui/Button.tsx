import { forwardRef, type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-150 ease-out focus:outline-none disabled:cursor-not-allowed';
    
    // Size styles
    const sizes = {
      sm: 'h-[36px] px-3 text-[13px]',
      md: 'h-[40px] px-[18px] text-[14px]',
      lg: 'h-[48px] px-6 text-[16px]',
    };

    // Variant styles
    const variants = {
      primary: 'bg-primary text-white shadow-sm hover:bg-primaryHover active:bg-primaryActive active:scale-[0.98] focus:ring-[3px] focus:ring-accent/35 disabled:bg-borderSubtle disabled:text-textMuted disabled:shadow-none',
      secondary: 'bg-transparent text-textPrimary border border-borderStrong hover:bg-hover hover:border-[#3A4C77] active:bg-elevated active:border-[#3A4C77] focus:ring-2 focus:ring-accent disabled:border-borderSubtle disabled:text-textMuted',
      ghost: 'bg-transparent text-textPrimary hover:bg-hover active:bg-elevated focus:ring-2 focus:ring-accent disabled:text-textMuted',
      danger: 'bg-danger text-white shadow-sm hover:bg-[#DC2626] active:bg-[#B91C1C] focus:ring-[3px] focus:ring-danger/35 disabled:bg-borderSubtle disabled:text-textMuted',
    };

    const combinedStyles = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;

    return (
      <button
        ref={ref}
        className={combinedStyles}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="opacity-70">{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
