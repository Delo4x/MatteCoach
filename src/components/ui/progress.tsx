import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  indicatorClassName?: string;
}

export function Progress({ value, className, indicatorClassName, ...props }: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-muted', className)}
      {...props}
    >
      <div
        className={cn('h-full transition-all duration-300', indicatorClassName || 'bg-primary')}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}

