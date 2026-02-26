"use client";

import { Calendar, Plus, Trophy, Users } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

export function CreateTournamentSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tạo giải đấu mới</h2>
          <p className="text-muted-foreground">
            Tổ chức giải đấu cho học sinh tham gia tranh tài
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="border-border bg-card border-2 p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">Thông tin cơ bản</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Tên giải đấu
                </label>
                <Input placeholder="VD: Đấu trường Toán học tháng 10" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Mô tả</label>
                <Textarea placeholder="Mô tả về giải đấu..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Môn học
                  </label>
                  <Select defaultValue="math">
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Chọn môn" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="math">Toán</Select.Item>
                      <Select.Item value="physics">Vật lý</Select.Item>
                      <Select.Item value="english">Tiếng Anh</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Khối lớp
                  </label>
                  <Select defaultValue="all">
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Chọn khối" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="all">Tất cả</Select.Item>
                      <Select.Item value="6">Lớp 6</Select.Item>
                      <Select.Item value="7">Lớp 7</Select.Item>
                      <Select.Item value="8">Lớp 8</Select.Item>
                      <Select.Item value="9">Lớp 9</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-border bg-card border-2 p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">Thời gian</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Bắt đầu
                </label>
                <div className="relative">
                  <Calendar className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input type="datetime-local" className="pl-10" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Kết thúc
                </label>
                <div className="relative">
                  <Calendar className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input type="datetime-local" className="pl-10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-border bg-card border-2 p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">Cấu hình thi đấu</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Thời gian làm bài (phút)
                  </label>
                  <Input type="number" defaultValue="45" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Số lượng câu hỏi
                  </label>
                  <Input type="number" defaultValue="50" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Hình thức
                </label>
                <Select defaultValue="solo">
                  <Select.Trigger className="w-full">
                    <Select.Value placeholder="Chọn hình thức" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="solo">Cá nhân</Select.Item>
                    <Select.Item value="team">Đồng đội</Select.Item>
                  </Select.Content>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Bộ câu hỏi
                </label>
                <Select>
                  <Select.Trigger className="w-full">
                    <Select.Value placeholder="Chọn bộ câu hỏi" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="set1">
                      Bộ đề ôn tập chương 1 (50 câu)
                    </Select.Item>
                    <Select.Item value="set2">
                      Bộ đề thi giữa kỳ (40 câu)
                    </Select.Item>
                    <Select.Item value="set3">
                      Bộ đề nâng cao (30 câu)
                    </Select.Item>
                  </Select.Content>
                </Select>
                <Button variant="link" className="h-auto p-0 text-sm">
                  + Tạo bộ câu hỏi mới
                </Button>
              </div>
            </div>
          </div>

          <div className="border-border bg-card border-2 p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">Phần thưởng (Tùy chọn)</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    Giải nhất
                  </label>
                  <Input placeholder="VD: 1000 điểm thưởng + Huy hiệu vàng" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    Giải nhì
                  </label>
                  <Input placeholder="VD: 500 điểm thưởng + Huy hiệu bạc" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium">
                    Giải ba
                  </label>
                  <Input placeholder="VD: 200 điểm thưởng + Huy hiệu đồng" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" size="lg">
          Lưu nháp
        </Button>
        <Button size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Tạo giải đấu
        </Button>
      </div>
    </div>
  );
}
