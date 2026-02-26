import { AlertTriangle, Bell, Check, Clock, X } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/data/alerts";

interface AlertsListProps {
  alerts: Alert[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Card
          key={alert.id}
          className={`${
            alert.severity === "critical" && alert.status === "active"
              ? "border-red-500"
              : alert.severity === "warning" && alert.status === "active"
                ? "border-orange-500"
                : ""
          }`}
        >
          <Card.Content className="p-4">
            <div className="flex items-start gap-3">
              <div
                className={`border-border mt-0.5 flex h-8 w-8 items-center justify-center border-2 ${
                  alert.severity === "critical"
                    ? "bg-red-500"
                    : alert.severity === "warning"
                      ? "bg-orange-500"
                      : "bg-blue-500"
                }`}
              >
                {alert.severity === "info" ? (
                  <Bell className="h-4 w-4 text-white" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{alert.title}</h3>
                  <Badge
                    variant={
                      alert.severity === "critical"
                        ? "solid"
                        : alert.severity === "warning"
                          ? "surface"
                          : "default"
                    }
                    size="sm"
                    className={
                      alert.severity === "critical"
                        ? "bg-red-500 text-white"
                        : alert.severity === "warning"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                    }
                  >
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <Badge
                    size="sm"
                    className={
                      alert.status === "active"
                        ? "bg-red-100 text-red-700"
                        : alert.status === "acknowledged"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                    }
                  >
                    {alert.status === "active"
                      ? "Đang hoạt động"
                      : alert.status === "acknowledged"
                        ? "Đã xác nhận"
                        : "Đã giải quyết"}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  {alert.message}
                </p>
                <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                  <span>Nguồn: {alert.source}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(alert.createdAt).toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>
              {alert.status === "active" && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-green-100"
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-red-100"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
