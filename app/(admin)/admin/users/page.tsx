import { Users, Search, Plus, MoreVertical } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl font-bold">Quản lý người dùng</h1>
          <p className="text-muted-foreground">
            Quản lý tài khoản và phân quyền
          </p>
        </div>
        <button className="inline-flex items-center gap-2 border-2 border-border bg-primary px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
          <Plus className="h-4 w-4" />
          Thêm người dùng
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-1 items-center gap-2 border-2 border-border bg-input px-3 py-2 shadow-xs">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <select className="border-2 border-border bg-input px-4 py-2 shadow-xs">
          <option>Tất cả role</option>
          <option>Admin</option>
          <option>Teacher</option>
          <option>Student</option>
        </select>
        <select className="border-2 border-border bg-input px-4 py-2 shadow-xs">
          <option>Trạng thái</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="border-2 border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border bg-muted">
                <th className="px-4 py-3 text-left text-sm font-bold">
                  Người dùng
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold">Email</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Role</th>
                <th className="px-4 py-3 text-left text-sm font-bold">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold">
                  Ngày tạo
                </th>
                <th className="px-4 py-3 text-right text-sm font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-border">
              {users.map((user, index) => (
                <tr key={index} className="transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center border-2 border-border bg-primary">
                        <Users className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`border border-border px-2 py-0.5 text-xs font-medium ${
                        user.role === "Admin"
                          ? "bg-destructive text-destructive-foreground"
                          : user.role === "Teacher"
                            ? "bg-primary"
                            : "bg-muted"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-sm ${user.status === "Active" ? "text-green-500" : "text-muted-foreground"}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-muted-foreground"}`}
                      />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.createdAt}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 transition-colors hover:bg-muted">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t-2 border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Hiển thị 1-10 của 100 người dùng
          </p>
          <div className="flex gap-2">
            <button className="border-2 border-border bg-background px-3 py-1 text-sm shadow-xs hover:bg-muted">
              Trước
            </button>
            <button className="border-2 border-border bg-primary px-3 py-1 text-sm shadow-xs">
              1
            </button>
            <button className="border-2 border-border bg-background px-3 py-1 text-sm shadow-xs hover:bg-muted">
              2
            </button>
            <button className="border-2 border-border bg-background px-3 py-1 text-sm shadow-xs hover:bg-muted">
              3
            </button>
            <button className="border-2 border-border bg-background px-3 py-1 text-sm shadow-xs hover:bg-muted">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const users = [
  {
    name: "Nguyễn Văn A",
    email: "a@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "01/01/2026",
  },
  {
    name: "Trần Thị B",
    email: "b@example.com",
    role: "Teacher",
    status: "Active",
    createdAt: "15/01/2026",
  },
  {
    name: "Lê Văn C",
    email: "c@example.com",
    role: "Student",
    status: "Active",
    createdAt: "20/01/2026",
  },
  {
    name: "Phạm Thị D",
    email: "d@example.com",
    role: "Student",
    status: "Inactive",
    createdAt: "25/01/2026",
  },
  {
    name: "Hoàng Văn E",
    email: "e@example.com",
    role: "Teacher",
    status: "Active",
    createdAt: "30/01/2026",
  },
];
