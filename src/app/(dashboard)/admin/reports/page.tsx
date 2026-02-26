"use client";

import {
  Activity,
  BarChart3,
  BookOpen,
  Calendar,
  Download,
  FileText,
  Filter,
  MoreVertical,
  Plus,
  RefreshCcw,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Loader } from "@/components/ui/Loader";
import { Menu } from "@/components/ui/Menu";
import { Select } from "@/components/ui/Select";
import { Table } from "@/components/ui/Table";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "@/lib/providers";

// Mock data
const reports = [
  {
    id: "rep-001",
    labelKey: "admin.reports.types.userActivity",
    type: "user-activity",
    date: "2024-03-15",
    status: "ready",
    size: "2.4 MB",
  },
  {
    id: "rep-002",
    labelKey: "admin.reports.types.learningProgress",
    type: "learning-progress",
    date: "2024-03-14",
    status: "ready",
    size: "5.1 MB",
  },
  {
    id: "rep-003",
    labelKey: "admin.reports.types.tournamentStats",
    type: "tournament-stats",
    date: "2024-03-14",
    status: "generating",
    size: "-",
  },
  {
    id: "rep-004",
    labelKey: "admin.reports.types.contentUsage",
    type: "content-usage",
    date: "2024-03-13",
    status: "ready",
    size: "1.8 MB",
  },
];

const reportTypes = [
  {
    id: "user-activity",
    labelKey: "admin.reports.types.userActivity",
    descriptionKey: "admin.reports.desc.userActivity",
    icon: Users,
    lastGenerated: "2024-03-15",
  },
  {
    id: "learning-progress",
    labelKey: "admin.reports.types.learningProgress",
    descriptionKey: "admin.reports.desc.learningProgress",
    icon: BookOpen,
    lastGenerated: "2024-03-14",
  },
  {
    id: "tournament-stats",
    labelKey: "admin.reports.types.tournamentStats",
    descriptionKey: "admin.reports.desc.tournamentStats",
    icon: BarChart3,
    lastGenerated: "2024-03-14",
  },
  {
    id: "content-usage",
    labelKey: "admin.reports.types.contentUsage",
    descriptionKey: "admin.reports.desc.contentUsage",
    icon: Activity,
    lastGenerated: "2024-03-13",
  },
];

export default function AdminReportsPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [reportType, setReportType] = useState<string>("user-activity");

  if (
    !user ||
    (user.role.code !== "root-admin" && user.role.code !== "tenant-admin")
  ) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">{t("errors.noAccess")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("admin.reports.title")}</h1>
          <p className="text-muted-foreground">
            {t("admin.reports.description")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            {t("admin.reports.timeRange")}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {t("admin.reports.export")}
          </Button>
          <Dialog>
            <Dialog.Trigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t("admin.reports.create")}
              </Button>
            </Dialog.Trigger>
            <Dialog.Content size="md">
              <Dialog.Header>{t("admin.reports.create")}</Dialog.Header>
              <div className="space-y-4 p-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {t("admin.reports.selectType")}
                  </label>
                  <Select
                    value={reportType}
                    onValueChange={(val) => setReportType(val)}
                  >
                    <Select.Trigger className="w-full">
                      <Select.Value
                        placeholder={t("admin.reports.selectType")}
                      />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="user-activity">
                        {t("admin.reports.types.userActivity")}
                      </Select.Item>
                      <Select.Item value="learning-progress">
                        {t("admin.reports.types.learningProgress")}
                      </Select.Item>
                      <Select.Item value="tournament-stats">
                        {t("admin.reports.types.tournamentStats")}
                      </Select.Item>
                      <Select.Item value="content-usage">
                        {t("admin.reports.types.contentUsage")}
                      </Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {t("admin.reports.timeRange")}
                  </label>
                  <Select defaultValue="week">
                    <Select.Trigger className="w-full">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="week">
                        {t("admin.reports.ranges.week")}
                      </Select.Item>
                      <Select.Item value="month">
                        {t("admin.reports.ranges.month")}
                      </Select.Item>
                      <Select.Item value="year">
                        {t("admin.reports.ranges.year")}
                      </Select.Item>
                    </Select.Content>
                  </Select>
                </div>
              </div>
              <Dialog.Footer>
                <Button variant="outline">{t("common.cancel")}</Button>
                <Button>{t("common.create")}</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>
        </div>
      </div>

      {/* Stats - restored section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  {t("admin.reports.stats.totalReports")}
                </p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-500">
                <FileText className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  {t("admin.reports.stats.generatedToday")}
                </p>
                <p className="text-2xl font-bold">25</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-500">
                <RefreshCcw className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  {t("admin.reports.stats.downloaded")}
                </p>
                <p className="text-2xl font-bold">856</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-purple-500">
                <Download className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  {t("admin.reports.stats.scheduled")}
                </p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-orange-500">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Report Types */}
      <div>
        <h2 className="mb-4 text-xl font-bold">
          {t("admin.reports.typesTitle")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reportTypes.map((report) => (
            <Card
              key={report.id}
              className="cursor-pointer transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Card.Content className="p-4">
                <div className="border-border bg-primary mb-3 flex h-10 w-10 items-center justify-center border-2">
                  <report.icon className="text-primary-foreground h-5 w-5" />
                </div>
                <h3 className="mb-1 font-bold">{t(report.labelKey)}</h3>
                <p className="text-muted-foreground mb-2 text-sm">
                  {t(report.descriptionKey)}
                </p>
                <p className="text-muted-foreground text-xs">
                  {t("admin.reports.lastUpdated")}:{" "}
                  {new Date(report.lastGenerated).toLocaleDateString("vi-VN")}
                </p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h2 className="mb-4 text-xl font-bold">
          {t("admin.reports.recentTitle")}
        </h2>
        <div className="border-border bg-card border-2 shadow-sm">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>{t("admin.reports.table.name")}</Table.Head>
                <Table.Head>{t("admin.reports.table.type")}</Table.Head>
                <Table.Head>{t("admin.reports.table.date")}</Table.Head>
                <Table.Head>{t("admin.reports.table.size")}</Table.Head>
                <Table.Head>{t("admin.reports.table.status")}</Table.Head>
                <Table.Head className="text-right">
                  {t("admin.reports.table.actions")}
                </Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {reports.map((report, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="font-medium">
                    {t(report.labelKey)}
                  </Table.Cell>
                  <Table.Cell className="text-muted-foreground capitalize">
                    {t(
                      `admin.reports.types.${report.type.replace(
                        /-([a-z])/g,
                        function (g) {
                          return g[1].toUpperCase();
                        },
                      )}` as any,
                    )}
                  </Table.Cell>
                  <Table.Cell className="text-muted-foreground">
                    {new Date(report.date).toLocaleDateString("vi-VN")}
                  </Table.Cell>
                  <Table.Cell className="text-muted-foreground">
                    {report.size}
                  </Table.Cell>
                  <Table.Cell>
                    {report.status === "generating" ? (
                      <span className="inline-flex items-center gap-2 text-sm text-orange-500">
                        <Loader className="h-4 w-4" />
                        {t("admin.reports.status.generating")}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm text-green-500">
                        {t("admin.reports.status.ready")}
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {report.status === "ready" && (
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      <Menu>
                        <Menu.Trigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </Menu.Trigger>
                        <Menu.Content align="end">
                          <Menu.Item>
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            {t("common.refresh")}
                          </Menu.Item>
                          <Menu.Item className="text-destructive">
                            <Filter className="mr-2 h-4 w-4" />
                            {t("common.delete")}
                          </Menu.Item>
                        </Menu.Content>
                      </Menu>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
