import { cn } from '@/lib/utils';

export function GlassCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('glass-panel rounded-card', className)} {...props} />
  );
}
