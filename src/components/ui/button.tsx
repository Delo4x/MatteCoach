import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'muted' | 'success' | 'secondary';
  size?: 'sm' | 'default' | 'lg' | 'icon-sm';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5': variant === 'default',
            'border border-border bg-card hover:bg-muted hover:border-primary/20 hover:shadow-sm text-foreground hover:-translate-y-0.5': variant === 'outline',
            'hover:bg-muted/80 text-foreground hover:-translate-y-0.5': variant === 'ghost',
            'bg-muted text-muted-foreground hover:bg-muted/80 hover:shadow-sm hover:-translate-y-0.5': variant === 'muted',
            'bg-success text-success-foreground hover:bg-success/90 hover:shadow-md hover:shadow-success/20 hover:-translate-y-0.5': variant === 'success',
            'bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-md hover:shadow-secondary/20 hover:-translate-y-0.5': variant === 'secondary',
          },
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 py-2': size === 'default',
            'h-12 px-6 text-lg': size === 'lg',
            'h-8 w-8': size === 'icon-sm',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

