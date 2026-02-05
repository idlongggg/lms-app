import { Settings } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { Table } from "@/components/ui/Table";
import { AlertRule } from "@/data/alerts";

interface AlertRulesTableProps {
  rules: AlertRule[];
}

export function AlertRulesTable({ rules }: AlertRulesTableProps) {
  return (
    <div className="border-border bg-card border-2 shadow-sm">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Quy tắc</Table.Head>
            <Table.Head>Mức độ</Table.Head>
            <Table.Head>Kênh thông báo</Table.Head>
            <Table.Head>Trạng thái</Table.Head>
            <Table.Head className="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rules.map((rule, index) => (
            <Table.Row key={index}>
              <Table.Cell className="font-medium">{rule.name}</Table.Cell>
              <Table.Cell>
                <Badge
                  size="sm"
                  className={
                    rule.severity === "critical"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }
                >
                  {rule.severity.toUpperCase()}
                </Badge>
              </Table.Cell>
              <Table.Cell className="text-muted-foreground">
                {rule.channel}
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-2">
                  <Switch checked={rule.enabled} />
                  <span
                    className={`text-sm ${rule.enabled ? "text-green-500" : "text-muted-foreground"}`}
                  >
                    {rule.enabled ? "Đang bật" : "Đã tắt"}
                  </span>
                </div>
              </Table.Cell>
              <Table.Cell className="text-right">
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
