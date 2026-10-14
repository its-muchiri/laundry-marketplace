import { cn } from '@/lib/utils';

export function GrainOverlay({
  className,
}: {
  className?: string;
}) {
  return <span aria-hidden="true" className={cn('grain', className)} />;
}
