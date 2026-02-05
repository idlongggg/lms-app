import { AlertTriangle, Bell, Settings } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Alert, AlertRule } from "@/data/alerts";

interface AlertsSummaryProps {
  alerts: Alert[];
  rules: AlertRule[];
}

export function AlertsSummary({ alerts, rules }: AlertsSummaryProps) {
  const activeAlerts = alerts.filter((a) => a.status === "active").length;
  const criticalAlerts = alerts.filter(
    (a) => a.severity === "critical" && a.status !== "resolved",
  ).length;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <Card.Content className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">
                Cảnh báo đang hoạt động
              </p>
              <p className="text-2xl font-bold">{activeAlerts}</p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-orange-500">
              <Bell className="h-5 w-5 text-white" />
            </div>
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Nghiêm trọng</p>
              <p className="text-2xl font-bold text-red-500">
                {criticalAlerts}
              </p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-red-500">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Quy tắc đang bật</p>
              <p className="text-2xl font-bold">
                {rules.filter((r) => r.enabled).length}/{rules.length}
              </p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-500">
              <Settings className="h-5 w-5 text-white" />
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
