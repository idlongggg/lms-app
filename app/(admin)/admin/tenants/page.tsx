'use client';

import { Building2, Search, Plus, MoreVertical, Users, BookOpen, Trophy, Settings } from "lucide-react";
import { useAuth } from "@/lib/auth";

// Mock tenants data
const tenants = [
  {
    id: 'tenant-001',
    name: 'Trường THCS ABC',
    code: 'school-abc',
    domain: 'abc.lms.vn',
    status: 'ACTIVE',
    plan: 'Enterprise',
    users: 1250,
    teachers: 45,
    students: 1180,
    storage: '45.2 GB',
    createdAt: '2024-01-15',
  },
  {
    id: 'tenant-002',
    name: 'Trung tâm XYZ',
    code: 'center-xyz',
    domain: 'xyz.lms.vn',
    status: 'ACTIVE',
    plan: 'Pro',
    users: 580,
    teachers: 22,
    students: 545,
    storage: '18.7 GB',
    createdAt: '2024-02-20',
  },
  {
    id: 'tenant-003',
    name: 'Học viện DEF',
    code: 'academy-def',
    domain: 'def.lms.vn',
    status: 'SUSPENDED',
    plan: 'Basic',
    users: 120,
    teachers: 8,
    students: 105,
    storage: '5.3 GB',
    createdAt: '2024-03-10',
  },
  {
    id: 'tenant-004',
    name: 'Trường TH GHI',
    code: 'school-ghi',
    domain: 'ghi.lms.vn',
    status: 'ACTIVE',
    plan: 'Enterprise',
    users: 890,
    teachers: 32,
    students: 845,
    storage: '32.1 GB',
    createdAt: '2024-04-05',
  },
];

export default function AdminTenantsPage() {
  const { user } = useAuth();

  // Only root-admin can access this page
  if (!user || user.role !== 'root-admin') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl">Quản lý Tenants</h1>
          <p className="text-muted-foreground">
            Quản lý tất cả các tenant trong hệ thống
          </p>
        </div>
        <button className="inline-flex items-center gap-2 border-2 border-border bg-primary px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
          <Plus className="h-4 w-4" />
          Thêm Tenant
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng Tenants</p>
              <p className="font-bold text-2xl">{tenants.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-purple-500">
              <Building2 className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đang hoạt động</p>
              <p className="font-bold text-2xl">{tenants.filter(t => t.status === 'ACTIVE').length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-green-500">
              <Users className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng người dùng</p>
              <p className="font-bold text-2xl">{tenants.reduce((sum, t) => sum + t.users, 0).toLocaleString()}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-blue-500">
              <Users className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng dung lượng</p>
              <p className="font-bold text-2xl">101.3 GB</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-orange-500">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-1 items-center gap-2 border-2 border-border bg-input px-3 py-2 shadow-xs">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm tenant..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <select className="border-2 border-border bg-input px-4 py-2 shadow-xs">
          <option>Tất cả gói</option>
          <option>Enterprise</option>
          <option>Pro</option>
          <option>Basic</option>
        </select>
        <select className="border-2 border-border bg-input px-4 py-2 shadow-xs">
          <option>Trạng thái</option>
          <option>Active</option>
          <option>Suspended</option>
        </select>
      </div>

      {/* Tenants Table */}
      <div className="border-2 border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border bg-muted">
                <th className="px-4 py-3 text-left text-sm font-bold">Tenant</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Domain</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Gói</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Người dùng</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Dung lượng</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Trạng thái</th>
                <th className="px-4 py-3 text-right text-sm font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-border">
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center border-2 border-border bg-primary">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-medium">{tenant.name}</span>
                        <p className="text-xs text-muted-foreground">{tenant.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{tenant.domain}</td>
                  <td className="px-4 py-3">
                    <span className={`border border-border px-2 py-0.5 text-xs font-medium ${
                      tenant.plan === 'Enterprise' ? 'bg-purple-500 text-white' :
                      tenant.plan === 'Pro' ? 'bg-blue-500 text-white' : 'bg-muted'
                    }`}>
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <span className="font-medium">{tenant.users.toLocaleString()}</span>
                      <p className="text-xs text-muted-foreground">
                        {tenant.teachers} GV • {tenant.students} HS
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{tenant.storage}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-sm ${
                      tenant.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      <span className={`h-2 w-2 rounded-full ${
                        tenant.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      {tenant.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm ngưng'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="border-2 border-border p-1.5 transition-all hover:bg-muted">
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className="border-2 border-border p-1.5 transition-all hover:bg-muted">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
