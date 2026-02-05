"use client";

import { Settings } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { mockAlertRules, mockAlerts } from "@/data/alerts";
import { useAuth } from "@/lib/auth";

import { AddRuleDialog } from "./_components/add-rule-dialog";
import { AlertRulesTable } from "./_components/alert-rules-table";
import { AlertsFilter } from "./_components/alerts-filter";
import { AlertsList } from "./_components/alerts-list";
import { AlertsSummary } from "./_components/alerts-summary";

export default function AdminAlertsPage() {
  const { user } = useAuth();
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);

  // Only root-admin can access this page
  if (!user || user.role.code !== "root-admin") {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">
          Bạn không có quyền truy cập trang này.
        </p>
      </div>
    );
  }

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesSeverity =
      severityFilter === "all" || alert.severity === severityFilter;
    const matchesStatus =
      statusFilter === "all" || alert.status === statusFilter;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cảnh báo hệ thống</h1>
          <p className="text-muted-foreground">Quản lý và cấu hình cảnh báo</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Cài đặt
          </Button>
          <AddRuleDialog
            isOpen={isAddRuleOpen}
            onOpenChange={setIsAddRuleOpen}
          />
        </div>
      </div>

      {/* Alert Summary */}
      <AlertsSummary alerts={mockAlerts} rules={mockAlertRules} />

      {/* Filters */}
      <AlertsFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        severityFilter={severityFilter}
        setSeverityFilter={setSeverityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Alerts List */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Cảnh báo gần đây</h2>
        <AlertsList alerts={filteredAlerts} />
      </div>

      {/* Alert Rules */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Quy tắc cảnh báo</h2>
        <AlertRulesTable rules={mockAlertRules} />
      </div>
    </div>
  );
}
