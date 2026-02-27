import { cn } from "@/lib/utils";
import { Card } from "./Card";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: React.ElementType;
  color?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  color = "bg-primary",
  className,
}: StatCardProps) {
  const isPositiveChange = change?.startsWith("+");

  return (
    <Card className={cn("shadow-sm", className)}>
      <Card.Content className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">{label}</p>
            <p className="text-2xl font-bold">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
            {change && (
              <p
                className={cn(
                  "text-sm",
                  isPositiveChange ? "text-green-500" : "text-red-500",
                )}
              >
                {change}
              </p>
            )}
          </div>
          <div
            className={cn(
              "border-border flex h-10 w-10 items-center justify-center border-2",
              color,
            )}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
