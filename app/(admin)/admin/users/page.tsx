'use client';

import { MoreVertical, Pencil, Plus, Search, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/retroui/Badge';
import { Button } from '@/components/retroui/Button';
import { Dialog } from '@/components/retroui/Dialog';
import { Input } from '@/components/retroui/Input';
import { Menu } from '@/components/retroui/Menu';
import { Select } from '@/components/retroui/Select';
import { Table } from '@/components/retroui/Table';

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
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
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
          <p className="text-muted-foreground">Quản lý tài khoản và phân quyền</p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <Dialog.Trigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm người dùng
            </Button>
          </Dialog.Trigger>
          <Dialog.Content size="md">
            <Dialog.Header>Thêm người dùng mới</Dialog.Header>
            <div className="space-y-4 p-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Họ và tên</label>
                <Input placeholder="Nhập họ và tên" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <Input type="email" placeholder="Nhập email" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Role</label>
                <Select defaultValue="student">
                  <Select.Trigger className="w-full">
                    <Select.Value placeholder="Chọn role" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="admin">Admin</Select.Item>
                    <Select.Item value="teacher">Teacher</Select.Item>
                    <Select.Item value="student">Student</Select.Item>
                  </Select.Content>
                </Select>
              </div>
            </div>
            <Dialog.Footer>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Hủy
              </Button>
              <Button onClick={() => setIsAddUserOpen(false)}>Lưu</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative min-w-[200px] flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Tìm kiếm người dùng..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <Select.Trigger className="w-[150px]">
            <Select.Value placeholder="Tất cả role" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Tất cả role</Select.Item>
            <Select.Item value="Admin">Admin</Select.Item>
            <Select.Item value="Teacher">Teacher</Select.Item>
            <Select.Item value="Student">Student</Select.Item>
          </Select.Content>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <Select.Trigger className="w-[150px]">
            <Select.Value placeholder="Trạng thái" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Tất cả</Select.Item>
            <Select.Item value="Active">Active</Select.Item>
            <Select.Item value="Inactive">Inactive</Select.Item>
          </Select.Content>
        </Select>
      </div>

      {/* Users Table */}
      <div className="border-border bg-card border-2 shadow-sm">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Người dùng</Table.Head>
              <Table.Head>Email</Table.Head>
              <Table.Head>Role</Table.Head>
              <Table.Head>Trạng thái</Table.Head>
              <Table.Head>Ngày tạo</Table.Head>
              <Table.Head className="text-right">Actions</Table.Head>
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
                <Table.Cell className="text-muted-foreground">{user.email}</Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={
                      user.role === 'Admin'
                        ? 'solid'
                        : user.role === 'Teacher'
                          ? 'surface'
                          : 'default'
                    }
                    size="sm"
                  >
                    {user.role}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`inline-flex items-center gap-1 text-sm ${user.status === 'Active' ? 'text-green-500' : 'text-muted-foreground'}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-muted-foreground'}`}
                    />
                    {user.status}
                  </span>
                </Table.Cell>
                <Table.Cell className="text-muted-foreground">{user.createdAt}</Table.Cell>
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
                        Chỉnh sửa
                      </Menu.Item>
                      <Menu.Item className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
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
          <p className="text-muted-foreground text-sm">
            Hiển thị 1-{filteredUsers.length} của {users.length} người dùng
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Trước
            </Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Sau
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const users = [
  {
    name: 'Nguyễn Văn A',
    email: 'a@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '01/01/2026',
  },
  {
    name: 'Trần Thị B',
    email: 'b@example.com',
    role: 'Teacher',
    status: 'Active',
    createdAt: '15/01/2026',
  },
  {
    name: 'Lê Văn C',
    email: 'c@example.com',
    role: 'Student',
    status: 'Active',
    createdAt: '20/01/2026',
  },
  {
    name: 'Phạm Thị D',
    email: 'd@example.com',
    role: 'Student',
    status: 'Inactive',
    createdAt: '25/01/2026',
  },
  {
    name: 'Hoàng Văn E',
    email: 'e@example.com',
    role: 'Teacher',
    status: 'Active',
    createdAt: '30/01/2026',
  },
];
