"use client";

import {
  BookOpen,
  Building2,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Dialog } from "@/components/retroui/Dialog";
import { Input } from "@/components/retroui/Input";
import { Menu } from "@/components/retroui/Menu";
import { Select } from "@/components/retroui/Select";
import { Table } from "@/components/retroui/Table";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "@/lib/providers";

// Mock tenants data
const tenants = [
  {
    id: "tenant-001",
    name: "Trường THCS ABC",
    code: "school-abc",
    domain: "abc.lms.vn",
    status: "ACTIVE",
    plan: "Enterprise",
    users: 1250,
    teachers: 45,
    students: 1180,
    storage: "45.2 GB",
    createdAt: "2024-01-15",
  },
  {
    id: "tenant-002",
    name: "Trung tâm XYZ",
    code: "center-xyz",
    domain: "xyz.lms.vn",
    status: "ACTIVE",
    plan: "Pro",
    users: 580,
    teachers: 22,
    students: 545,
    storage: "18.7 GB",
    createdAt: "2024-02-20",
  },
  {
    id: "tenant-003",
    name: "Học viện DEF",
    code: "academy-def",
    domain: "def.lms.vn",
    status: "SUSPENDED",
    plan: "Basic",
    users: 120,
    teachers: 8,
    students: 105,
    storage: "5.3 GB",
    createdAt: "2024-03-10",
  },
  {
    id: "tenant-004",
    name: "Trường TH GHI",
    code: "school-ghi",
    domain: "ghi.lms.vn",
    status: "ACTIVE",
    plan: "Enterprise",
    users: 890,
    teachers: 32,
    students: 845,
    storage: "32.1 GB",
    createdAt: "2024-04-05",
  },
];

export default function AdminTenantsPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);

  // Only root-admin can access this page
  if (!user || user.role !== "root-admin") {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">{t("errors.noAccess")}</p>
      </div>
    );
  }

  const filteredTenants = tenants.filter((tenant) => {
    const matchesPlan = planFilter === "all" || tenant.plan === planFilter;
    const matchesStatus =
      statusFilter === "all" || tenant.status === statusFilter;
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.domain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlan && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("admin.tenants.title")}</h1>
          <p className="text-muted-foreground">
            {t("admin.tenants.description")}
          </p>
        </div>
        <Dialog open={isAddTenantOpen} onOpenChange={setIsAddTenantOpen}>
          <Dialog.Trigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("admin.tenants.add")}
            </Button>
          </Dialog.Trigger>
          <Dialog.Content size="md">
            <Dialog.Header>{t("admin.tenants.form.title")}</Dialog.Header>
            <div className="space-y-4 p-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {t("admin.tenants.form.name")}
                </label>
                <Input placeholder={t("admin.tenants.form.name")} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {t("admin.tenants.form.code")}
                </label>
                <Input placeholder={t("admin.tenants.form.code")} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {t("admin.tenants.form.domain")}
                </label>
                <Input placeholder="example.lms.vn" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {t("admin.tenants.form.plan")}
                </label>
                <Select defaultValue="basic">
                  <Select.Trigger className="w-full">
                    <Select.Value placeholder={t("admin.tenants.form.plan")} />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="basic">Basic</Select.Item>
                    <Select.Item value="pro">Pro</Select.Item>
                    <Select.Item value="enterprise">Enterprise</Select.Item>
                  </Select.Content>
                </Select>
              </div>
            </div>
            <Dialog.Footer>
              <Button
                variant="outline"
                onClick={() => setIsAddTenantOpen(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button onClick={() => setIsAddTenantOpen(false)}>
                {t("common.save")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  {t("admin.dashboard.stats.totalTenants")}
                </p>
                <p className="text-2xl font-bold">{tenants.length}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-purple-500">
                <Building2 className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  {t("admin.tenants.status.active")}
                </p>
                <p className="text-2xl font-bold">
                  {tenants.filter((t) => t.status === "ACTIVE").length}
                </p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-500">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  {t("admin.dashboard.stats.totalUsers")}
                </p>
                <p className="text-2xl font-bold">
                  {tenants
                    .reduce((sum, t) => sum + t.users, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-500">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  {t("admin.tenants.table.storage")}
                </p>
                <p className="text-2xl font-bold">101.3 GB</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-orange-500">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative min-w-[200px] flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder={t("admin.tenants.search")}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <Select.Trigger className="w-[150px]">
            <Select.Value placeholder={t("admin.tenants.filterPlan")} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">
              {t("admin.tenants.filterPlan")}
            </Select.Item>
            <Select.Item value="Enterprise">Enterprise</Select.Item>
            <Select.Item value="Pro">Pro</Select.Item>
            <Select.Item value="Basic">Basic</Select.Item>
          </Select.Content>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <Select.Trigger className="w-[150px]">
            <Select.Value placeholder={t("admin.tenants.filterStatus")} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">{t("common.all")}</Select.Item>
            <Select.Item value="ACTIVE">
              {t("admin.tenants.status.active")}
            </Select.Item>
            <Select.Item value="SUSPENDED">
              {t("admin.tenants.status.suspended")}
            </Select.Item>
          </Select.Content>
        </Select>
      </div>

      {/* Tenants Table */}
      <div className="border-border bg-card border-2 shadow-sm">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>{t("admin.tenants.table.tenant")}</Table.Head>
              <Table.Head>{t("admin.tenants.table.domain")}</Table.Head>
              <Table.Head>{t("admin.tenants.table.plan")}</Table.Head>
              <Table.Head>{t("admin.tenants.table.users")}</Table.Head>
              <Table.Head>{t("admin.tenants.table.storage")}</Table.Head>
              <Table.Head>{t("admin.tenants.table.status")}</Table.Head>
              <Table.Head className="text-right">
                {t("admin.tenants.table.actions")}
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredTenants.map((tenant) => (
              <Table.Row key={tenant.id}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <div className="border-border bg-primary flex h-8 w-8 items-center justify-center border-2">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-medium">{tenant.name}</span>
                      <p className="text-muted-foreground text-xs">
                        {tenant.code}
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-muted-foreground">
                  {tenant.domain}
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={
                      tenant.plan === "Enterprise"
                        ? "solid"
                        : tenant.plan === "Pro"
                          ? "surface"
                          : "default"
                    }
                    size="sm"
                  >
                    {tenant.plan}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-sm">
                    <span className="font-medium">
                      {tenant.users.toLocaleString()}
                    </span>
                    <p className="text-muted-foreground text-xs">
                      {tenant.teachers} GV • {tenant.students} HS
                    </p>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-muted-foreground">
                  {tenant.storage}
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`inline-flex items-center gap-1 text-sm ${
                      tenant.status === "ACTIVE"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        tenant.status === "ACTIVE"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    {tenant.status === "ACTIVE"
                      ? t("admin.tenants.status.active")
                      : t("admin.tenants.status.suspended")}
                  </span>
                </Table.Cell>
                <Table.Cell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Menu>
                      <Menu.Trigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </Menu.Trigger>
                      <Menu.Content align="end">
                        <Menu.Item>
                          <Pencil className="mr-2 h-4 w-4" />
                          {t("common.edit")}
                        </Menu.Item>
                        <Menu.Item className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
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
  );
}
