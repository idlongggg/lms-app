'use client';

import { FileText, Search, Plus, Filter, Edit, Trash2, Copy, BarChart3 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { mockQuestions, getQuestionStats } from "@/lib/mock/classes";

export default function TeacherQuestionsPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'teacher') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  const questions = mockQuestions;
  const stats = getQuestionStats('user-teacher-001');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl">Ngân hàng câu hỏi</h1>
          <p className="text-muted-foreground">
            Quản lý câu hỏi cho bài học và giải đấu
          </p>
        </div>
        <button className="inline-flex items-center gap-2 border-2 border-border bg-primary px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
          <Plus className="h-4 w-4" />
          Thêm câu hỏi
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Tổng câu hỏi</p>
          <p className="font-bold text-2xl">{stats.total}</p>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Dễ</p>
          <p className="font-bold text-2xl text-green-500">{stats.byDifficulty.easy}</p>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Trung bình</p>
          <p className="font-bold text-2xl text-yellow-500">{stats.byDifficulty.medium}</p>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Khó</p>
          <p className="font-bold text-2xl text-red-500">{stats.byDifficulty.hard}</p>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Lượt sử dụng</p>
          <p className="font-bold text-2xl">{stats.totalUsage}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-1 items-center gap-2 border-2 border-border bg-input px-3 py-2 shadow-xs">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <select className="border-2 border-border bg-input px-4 py-2 shadow-xs">
          <option>Tất cả khối</option>
          <option>Lớp 6</option>
          <option>Lớp 7</option>
          <option>Lớp 8</option>
          <option>Lớp 9</option>
        </select>
        <select className="border-2 border-border bg-input px-4 py-2 shadow-xs">
          <option>Độ khó</option>
          <option>Dễ</option>
          <option>Trung bình</option>
          <option>Khó</option>
        </select>
        <select className="border-2 border-border bg-input px-4 py-2 shadow-xs">
          <option>Loại câu hỏi</option>
          <option>Trắc nghiệm</option>
          <option>Đúng/Sai</option>
          <option>Điền khuyết</option>
        </select>
      </div>

      {/* Questions List */}
      <div className="border-2 border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border bg-muted">
                <th className="px-4 py-3 text-left text-sm font-bold">Câu hỏi</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Chủ đề</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Khối</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Loại</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Độ khó</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Sử dụng</th>
                <th className="px-4 py-3 text-right text-sm font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-border">
              {questions.map((question) => (
                <tr key={question.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <p className="font-medium line-clamp-2">{question.content}</p>
                    {question.options && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Đáp án: {question.correctAnswer}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{question.topic}</td>
                  <td className="px-4 py-3">Lớp {question.grade}</td>
                  <td className="px-4 py-3">
                    <span className="border border-border bg-muted px-2 py-0.5 text-xs">
                      {question.type === 'MULTIPLE_CHOICE' ? 'Trắc nghiệm' :
                       question.type === 'TRUE_FALSE' ? 'Đúng/Sai' :
                       question.type === 'FILL_BLANK' ? 'Điền khuyết' : 'Tự luận'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`border border-border px-2 py-0.5 text-xs ${
                      question.difficulty === 'EASY' ? 'bg-green-100 text-green-700' :
                      question.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {question.difficulty === 'EASY' ? 'Dễ' :
                       question.difficulty === 'MEDIUM' ? 'TB' : 'Khó'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {question.usageCount} lần
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="border-2 border-border p-1.5 transition-all hover:bg-muted" title="Sửa">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="border-2 border-border p-1.5 transition-all hover:bg-muted" title="Sao chép">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="border-2 border-border p-1.5 transition-all hover:bg-red-100" title="Xóa">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats by Topic */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <h3 className="mb-4 font-bold">Theo loại câu hỏi</h3>
          <div className="space-y-3">
            {[
              { label: 'Trắc nghiệm', count: stats.byType.multipleChoice, color: 'bg-blue-500' },
              { label: 'Đúng/Sai', count: stats.byType.trueFalse, color: 'bg-green-500' },
              { label: 'Điền khuyết', count: stats.byType.fillBlank, color: 'bg-yellow-500' },
              { label: 'Tự luận', count: stats.byType.shortAnswer, color: 'bg-purple-500' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`h-3 w-3 ${item.color}`} />
                <span className="flex-1 text-sm">{item.label}</span>
                <span className="font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <h3 className="mb-4 font-bold">Theo khối lớp</h3>
          <div className="space-y-3">
            {Object.entries(stats.byGrade).map(([grade, count], index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-3 w-3 bg-primary" />
                <span className="flex-1 text-sm">Lớp {grade}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
