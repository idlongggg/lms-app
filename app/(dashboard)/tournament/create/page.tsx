'use client';

import { Calendar, Clock, FileText, HelpCircle, Plus, Settings, Trophy, Users } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '@/lib/auth';
import { mockClasses, mockQuestions } from '@/lib/mock/classes';

export default function TeacherTournamentCreatePage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'RANKED',
    grade: '6',
    duration: '45',
    questionCount: '20',
    maxParticipants: '100',
    startDate: '',
    startTime: '',
    classRestriction: [] as string[],
  });

  if (!user || (user.role !== 'teacher' && user.role !== 'tenant-admin')) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  const classes = mockClasses;
  const questionCount = mockQuestions.length;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassToggle = (classId: string) => {
    setFormData((prev) => ({
      ...prev,
      classRestriction: prev.classRestriction.includes(classId)
        ? prev.classRestriction.filter((id) => id !== classId)
        : [...prev.classRestriction, classId],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Tạo giải đấu mới</h1>
        <p className="text-muted-foreground">Thiết lập thông tin cho giải đấu</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Info */}
          <div className="border-border bg-card border-2 p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Thông tin cơ bản</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Tên giải đấu *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="VD: Đấu trường Toán học tuần 5"
                  className="border-border bg-input focus:border-primary w-full border-2 px-3 py-2 shadow-xs outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Mô tả về giải đấu..."
                  className="border-border bg-input focus:border-primary w-full border-2 px-3 py-2 shadow-xs outline-none"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Loại giải đấu *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="border-border bg-input focus:border-primary w-full border-2 px-3 py-2 shadow-xs outline-none"
                  >
                    <option value="RANKED">Xếp hạng</option>
                    <option value="PRACTICE">Luyện tập</option>
                    <option value="CLASS_ONLY">Riêng lớp</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Khối lớp *</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="border-border bg-input focus:border-primary w-full border-2 px-3 py-2 shadow-xs outline-none"
                  >
                    {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                      <option key={g} value={g}>
                        Lớp {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Time Settings */}
          <div className="border-border bg-card border-2 p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Thời gian</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Ngày bắt đầu *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="border-border bg-input focus:border-primary w-full border-2 px-3 py-2 shadow-xs outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Giờ bắt đầu *</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="border-border bg-input focus:border-primary w-full border-2 px-3 py-2 shadow-xs outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Thời gian làm bài (phút) *</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="border-border bg-input focus:border-primary w-full border-2 px-3 py-2 shadow-xs outline-none"
                >
                  {[15, 30, 45, 60, 90, 120].map((d) => (
                    <option key={d} value={d}>
                      {d} phút
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Số người tham gia tối đa</label>
                <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  min="1"
                  className="border-border bg-input focus:border-primary w-full border-2 px-3 py-2 shadow-xs outline-none"
                />
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="border-border bg-card border-2 p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Câu hỏi</h2>
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Số câu hỏi *</label>
                <select
                  name="questionCount"
                  value={formData.questionCount}
                  onChange={handleChange}
                  className="border-border bg-input focus:border-primary w-full border-2 px-3 py-2 shadow-xs outline-none"
                >
                  {[10, 15, 20, 25, 30, 40, 50].map((q) => (
                    <option key={q} value={q}>
                      {q} câu
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <p className="text-muted-foreground text-sm">
                  Bạn có {questionCount} câu hỏi trong ngân hàng
                </p>
              </div>
            </div>
            <button className="border-border bg-muted/50 hover:bg-muted w-full border-2 border-dashed p-4 text-center transition-all">
              <FileText className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
              <p className="font-medium">Chọn câu hỏi từ ngân hàng</p>
              <p className="text-muted-foreground text-sm">Hoặc để hệ thống tự động chọn</p>
            </button>
          </div>

          {/* Class Restriction (for CLASS_ONLY type) */}
          {formData.type === 'CLASS_ONLY' && (
            <div className="border-border bg-card border-2 p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">Giới hạn lớp học</h2>
              <p className="text-muted-foreground mb-3 text-sm">
                Chọn các lớp được phép tham gia giải đấu này
              </p>
              <div className="space-y-2">
                {classes.map((cls) => (
                  <label
                    key={cls.id}
                    className="border-border hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded border-2 p-3 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={formData.classRestriction.includes(cls.id)}
                      onChange={() => handleClassToggle(cls.id)}
                      className="h-4 w-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{cls.name}</p>
                      <p className="text-muted-foreground text-sm">{cls.studentCount} học sinh</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Preview Card */}
          <div className="border-border bg-card border-2 p-4 shadow-sm">
            <h3 className="mb-4 font-bold">Xem trước</h3>
            <div className="border-border bg-muted/50 rounded border-2 p-4">
              <div className="border-border bg-primary mb-3 flex h-10 w-10 items-center justify-center border-2">
                <Trophy className="h-5 w-5" />
              </div>
              <h4 className="font-bold">{formData.name || 'Tên giải đấu'}</h4>
              <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                {formData.description || 'Mô tả giải đấu...'}
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formData.startDate || 'Chưa chọn ngày'}</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {formData.duration} phút • {formData.questionCount} câu
                  </span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Tối đa {formData.maxParticipants} người</span>
                </div>
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="border-border border-2 bg-blue-50 p-4 shadow-sm dark:bg-blue-950">
            <h3 className="mb-2 flex items-center gap-2 font-bold">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              Hướng dẫn
            </h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                • <strong>Xếp hạng:</strong> Điểm được tính vào bảng xếp hạng
              </li>
              <li>
                • <strong>Luyện tập:</strong> Không tính điểm, học sinh có thể làm nhiều lần
              </li>
              <li>
                • <strong>Riêng lớp:</strong> Chỉ học sinh trong lớp được chọn mới tham gia được
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="border-border bg-primary w-full border-2 px-4 py-3 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
              <Plus className="mr-2 inline h-5 w-5" />
              Tạo giải đấu
            </button>
            <button className="border-border bg-muted hover:bg-muted/80 w-full border-2 px-4 py-3 font-medium transition-all">
              Lưu nháp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
