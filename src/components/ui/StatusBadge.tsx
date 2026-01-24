import { cn } from "@/lib/utils";

type StatusType = "active" | "inactive" | "pending" | "paid" | "due" | "partial" | "completed" | "cancelled";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  active: "bg-success/10 text-success border-success/20",
  inactive: "bg-muted text-muted-foreground border-muted",
  pending: "bg-warning/10 text-warning border-warning/20",
  paid: "bg-success/10 text-success border-success/20",
  due: "bg-destructive/10 text-destructive border-destructive/20",
  partial: "bg-info/10 text-info border-info/20",
  completed: "bg-success/10 text-success border-success/20",
  cancelled: "bg-muted text-muted-foreground border-muted",
};

const statusLabels: Record<StatusType, string> = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
  paid: "Paid",
  due: "Due",
  partial: "Partial",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
