import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-kotochan-pink text-white hover:bg-opacity-90',
      secondary: 'bg-kotochan-mint text-kotochan-brown hover:bg-opacity-90',
      ghost: 'bg-transparent text-kotochan-brown hover:bg-kotochan-cream',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'rounded-kotochan font-bold transition-all duration-200 ease-in-out',
          'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
          'shadow-kotochan hover:shadow-lg no-select',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };