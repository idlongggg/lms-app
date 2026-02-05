"use client";

import { Calendar, Clock, Plus, Trophy, Users } from "lucide-react";
import { useState } from "react";

import { Button, Card, Dialog } from "@/components/ui";
import { mockClasses, mockQuestions } from "@/data/classes";

export function CreateTournamentSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "RANKED",
    grade: "6",
    duration: "45",
    questionCount: "20",
    maxParticipants: "100",
    startDate: "",
    startTime: "",
    classRestriction: [] as string[],
  });

  const classes = mockClasses;
  const questionCount = mockQuestions.length;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Tạo giải đấu
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content size="lg">
          <Dialog.Header>Tạo giải đấu mới</Dialog.Header>
          <div className="max-h-[70vh] space-y-6 overflow-y-auto p-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-bold">Thông tin cơ bản</h3>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Tên giải đấu *
                </label>
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
                  rows={2}
                  placeholder="Mô tả về giải đấu..."
                  className="border-border bg-input focus:border-primary w-full border-2 px-3 py-2 shadow-xs outline-none"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Loại giải đấu *
                  </label>
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
                  <label className="mb-1 block text-sm font-medium">
                    Khối lớp *
                  </label>
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

            {/* Time Settings */}
            <div className="space-y-4">
              <h3 className="font-bold">Thời gian</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Ngày bắt đầu *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="border-border bg-input focus:border-primary w-full border-2 px-3 py-2 shadow-xs outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Giờ bắt đầu *
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="border-border bg-input focus:border-primary w-full border-2 px-3 py-2 shadow-xs outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Thời gian làm bài (phút) *
                  </label>
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
                  <label className="mb-1 block text-sm font-medium">
                    Số người tham gia tối đa
                  </label>
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
            <div className="space-y-4">
              <h3 className="font-bold">Câu hỏi</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Số câu hỏi *
                  </label>
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
            </div>

            {/* Class Restriction */}
            {formData.type === "CLASS_ONLY" && (
              <div className="space-y-4">
                <h3 className="font-bold">Giới hạn lớp học</h3>
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
                        <p className="text-muted-foreground text-sm">
                          {cls.studentCount} học sinh
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Preview */}
            <Card className="bg-muted/50 p-4">
              <h4 className="mb-2 font-bold">Xem trước</h4>
              <div className="flex items-start gap-3">
                <div className="border-border bg-primary flex h-10 w-10 items-center justify-center border-2">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold">{formData.name || "Tên giải đấu"}</p>
                  <div className="text-muted-foreground mt-1 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{formData.startDate || "Chưa chọn ngày"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formData.duration} phút • {formData.questionCount} câu
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>Tối đa {formData.maxParticipants} người</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <Dialog.Footer>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setIsOpen(false)}>Tạo giải đấu</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
