import { cn } from '@/lib/utils';

interface ReededGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  ribWidth?: number;
  blur?: number;
  tint?: number;
  intensity?: number;
}

export function ReededGlass({
  ribWidth = 3,
  blur = 18,
  tint = 70,
  intensity = 0.18,
  className,
  style,
  ...props
}: ReededGlassProps) {
  return (
    <div
      className={cn('reeded-glass rounded-card', className)}
      style={
        {
          '--reed-rib': `${ribWidth}px`,
          '--reed-blur': `${blur}px`,
          '--reed-tint-opacity': tint / 100,
          '--reed-intensity': intensity,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
