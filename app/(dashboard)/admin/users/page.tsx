"use client";

import {
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Menu } from "@/components/ui/Menu";
import { Select } from "@/components/ui/Select";
import { Table } from "@/components/ui/Table";
import { useTranslation } from "@/lib/providers";

const users = [
  {
    name: "Nguyễn Văn A",
    email: "a@example.com",
    role: "admin",
    status: "active",
    createdAt: "01/01/2026",
  },
  {
    name: "Trần Thị B",
    email: "b@example.com",
    role: "teacher",
    status: "active",
    createdAt: "15/01/2026",
  },
  {
    name: "Lê Văn C",
    email: "c@example.com",
    role: "student",
    status: "active",
    createdAt: "20/01/2026",
  },
  {
    name: "Phạm Thị D",
    email: "d@example.com",
    role: "student",
    status: "inactive",
    createdAt: "25/01/2026",
  },
  {
    name: "Hoàng Văn E",
    email: "e@example.com",
    role: "teacher",
    status: "active",
    createdAt: "30/01/2026",
  },
];

export default function AdminUsersPage() {
  const { t } = useTranslation();
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("admin.users.title")}</h1>
          <p className="text-muted-foreground">
            {t("admin.users.description")}
          </p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <Dialog.Trigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("admin.users.add")}
            </Button>
          </Dialog.Trigger>
          <Dialog.Content size="md">
            <Dialog.Header>{t("admin.users.form.title")}</Dialog.Header>
            <div className="space-y-4 p-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {t("admin.users.form.name")}
                </label>
                <Input placeholder={t("admin.users.form.name")} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {t("admin.users.form.email")}
                </label>
                <Input type="email" placeholder={t("admin.users.form.email")} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {t("admin.users.form.role")}
                </label>
                <Select defaultValue="student">
                  <Select.Trigger className="w-full">
                    <Select.Value placeholder={t("admin.users.form.role")} />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="admin">
                      {t("admin.users.roles.admin")}
                    </Select.Item>
                    <Select.Item value="teacher">
                      {t("admin.users.roles.teacher")}
                    </Select.Item>
                    <Select.Item value="student">
                      {t("admin.users.roles.student")}
                    </Select.Item>
                  </Select.Content>
                </Select>
              </div>
            </div>
            <Dialog.Footer>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                {t("common.cancel")}
              </Button>
              <Button onClick={() => setIsAddUserOpen(false)}>
                {t("common.save")}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative min-w-[200px] flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder={t("admin.users.search")}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <Select.Trigger className="w-[150px]">
            <Select.Value placeholder={t("admin.users.filterRole")} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">{t("admin.users.filterRole")}</Select.Item>
            <Select.Item value="admin">
              {t("admin.users.roles.admin")}
            </Select.Item>
            <Select.Item value="teacher">
              {t("admin.users.roles.teacher")}
            </Select.Item>
            <Select.Item value="student">
              {t("admin.users.roles.student")}
            </Select.Item>
          </Select.Content>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <Select.Trigger className="w-[150px]">
            <Select.Value placeholder={t("admin.users.filterStatus")} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">{t("common.all")}</Select.Item>
            <Select.Item value="active">
              {t("admin.tenants.status.active")}
            </Select.Item>
            <Select.Item value="inactive">
              {t("admin.tenants.status.suspended")}
            </Select.Item>
          </Select.Content>
        </Select>
      </div>

      {/* Users Table */}
      <div className="border-border bg-card border-2 shadow-sm">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>{t("admin.users.table.user")}</Table.Head>
              <Table.Head>{t("admin.users.table.email")}</Table.Head>
              <Table.Head>{t("admin.users.table.role")}</Table.Head>
              <Table.Head>{t("admin.users.table.status")}</Table.Head>
              <Table.Head>{t("admin.users.table.joined")}</Table.Head>
              <Table.Head className="text-right">
                {t("admin.users.table.actions")}
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredUsers.map((user, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <div className="border-border bg-primary flex h-8 w-8 items-center justify-center border-2">
                      <Users className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-muted-foreground">
                  {user.email}
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={
                      user.role === "admin"
                        ? "solid"
                        : user.role === "teacher"
                          ? "surface"
                          : "default"
                    }
                    size="sm"
                  >
                    {t(`admin.users.roles.${user.role}` as any)}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`inline-flex items-center gap-1 text-sm ${user.status === "active" ? "text-green-500" : "text-muted-foreground"}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-muted-foreground"}`}
                    />
                    {user.status === "active"
                      ? t("admin.tenants.status.active")
                      : t("admin.tenants.status.suspended")}
                  </span>
                </Table.Cell>
                <Table.Cell className="text-muted-foreground">
                  {user.createdAt}
                </Table.Cell>
                <Table.Cell className="text-right">
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
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* Pagination */}
        <div className="border-border flex items-center justify-between border-t-2 px-4 py-3">
          <p className="text-muted-foreground text-sm">{t("common.viewAll")}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              {t("common.previous")}
            </Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              {t("common.next")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
