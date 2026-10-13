import { cn } from '@/lib/utils';

export function GlowOrbs({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      {...props}
    >
      <div className="glow-orb glow-orb-aqua" />
      <div className="glow-orb glow-orb-navy" />
    </div>
  );
}
