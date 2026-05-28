import { cn } from "@/lib/utils";

interface Props {
  value: number;
  max?: number;
  label?: string;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  className,
  showLabel = true,
}: Props) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={cn("w-full", className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      <div className="flex items-center justify-between mb-1.5">
        {label && (
          <span className="text-sm text-muted">{label}</span>
        )}
        {showLabel && (
          <span className="text-sm font-600 text-primary ml-auto">
            {percentage}%
          </span>
        )}
      </div>
      <div className="h-2.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
