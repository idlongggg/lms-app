"use client";

import { FileText, Folder, MoreVertical, Plus, Search } from "lucide-react";

import { Badge, Button, Card, Input, Menu, Select } from "@/components/ui";

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý nội dung</h1>
          <p className="text-muted-foreground">
            Quản lý bài học, câu hỏi và tài liệu
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Thêm nội dung
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative min-w-[200px] flex-1">
          <Input placeholder="Tìm kiếm nội dung..." className="pl-9" />
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        </div>
        <Select defaultValue="all">
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="Môn học" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Tất cả môn học</Select.Item>
            <Select.Item value="math">Toán học</Select.Item>
            <Select.Item value="english">Tiếng Anh</Select.Item>
            <Select.Item value="physics">Vật lý</Select.Item>
          </Select.Content>
        </Select>
        <Select defaultValue="all-types">
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="Loại nội dung" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all-types">Tất cả loại</Select.Item>
            <Select.Item value="lesson">Bài học</Select.Item>
            <Select.Item value="question">Câu hỏi</Select.Item>
            <Select.Item value="document">Tài liệu</Select.Item>
          </Select.Content>
        </Select>
      </div>

      {/* Content Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contents.map((content, index) => (
          <Card
            key={index}
            className="shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
          >
            <Card.Content className="p-0">
              <div className="border-border bg-muted flex items-start justify-between border-b-2 p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`border-border flex h-10 w-10 items-center justify-center border-2 ${content.type === "folder" ? "bg-accent" : "bg-primary"}`}
                  >
                    {content.type === "folder" ? (
                      <Folder className="h-5 w-5" />
                    ) : (
                      <FileText className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{content.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {content.subject}
                    </p>
                  </div>
                </div>
                <Menu>
                  <Menu.Trigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </Menu.Trigger>
                  <Menu.Content align="end">
                    <Menu.Item>Sửa</Menu.Item>
                    <Menu.Item className="text-destructive">Xóa</Menu.Item>
                  </Menu.Content>
                </Menu>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {content.items} items
                  </span>
                  <Badge
                    variant={
                      content.status === "Published" ? "surface" : "default"
                    }
                    className={
                      content.status === "Published"
                        ? "border-green-500 bg-green-500/10 text-green-500"
                        : ""
                    }
                  >
                    {content.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-2 text-xs">
                  Cập nhật: {content.updatedAt}
                </p>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}

const contents = [
  {
    title: "Đại số cơ bản",
    subject: "Toán học",
    type: "folder",
    items: 15,
    status: "Published",
    updatedAt: "2 giờ trước",
  },
  {
    title: "Ngữ pháp tiếng Anh",
    subject: "Tiếng Anh",
    type: "folder",
    items: 20,
    status: "Published",
    updatedAt: "1 ngày trước",
  },
  {
    title: "Vật lý lớp 10",
    subject: "Vật lý",
    type: "folder",
    items: 12,
    status: "Draft",
    updatedAt: "3 ngày trước",
  },
  {
    title: "Lịch sử Việt Nam",
    subject: "Lịch sử",
    type: "lesson",
    items: 8,
    status: "Published",
    updatedAt: "1 tuần trước",
  },
  {
    title: "Hóa học đại cương",
    subject: "Hóa học",
    type: "folder",
    items: 18,
    status: "Draft",
    updatedAt: "2 tuần trước",
  },
  {
    title: "Sinh học tế bào",
    subject: "Sinh học",
    type: "lesson",
    items: 10,
    status: "Published",
    updatedAt: "1 tháng trước",
  },
];
