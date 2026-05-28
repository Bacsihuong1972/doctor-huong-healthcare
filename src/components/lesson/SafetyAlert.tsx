import { AlertTriangle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SafetyAlertData } from "@/types";

interface Props {
  alert: SafetyAlertData;
  className?: string;
}

export function SafetyAlert({ alert, className }: Props) {
  const isWarning = alert.type === "medication" || alert.type === "exercise";

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "rounded-2xl p-5 border-l-4 flex gap-4",
        isWarning
          ? "bg-orange-50 border-accent text-orange-900"
          : "bg-blue-50 border-blue-400 text-blue-900",
        className
      )}
    >
      <div className="shrink-0 mt-0.5">
        {isWarning ? (
          <AlertTriangle
            className="w-6 h-6 text-accent"
            aria-hidden="true"
          />
        ) : (
          <Shield className="w-6 h-6 text-blue-500" aria-hidden="true" />
        )}
      </div>
      <div>
        <p className="font-700 text-sm mb-1">
          {isWarning ? "Lưu ý quan trọng" : "Thông báo giáo dục"}
        </p>
        <p className="text-sm leading-relaxed">{alert.message}</p>
      </div>
    </div>
  );
}
