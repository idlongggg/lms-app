'use client';

import { useState } from 'react';
import { FileText, Search, Plus, Edit, Trash2, Copy } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { mockQuestions, getQuestionStats } from '@/lib/mock/classes';
import { Table } from '@/components/retroui/Table';
import { Button } from '@/components/retroui/Button';
import { Badge } from '@/components/retroui/Badge';
import { Input } from '@/components/retroui/Input';
import { Select } from '@/components/retroui/Select';
import { Card } from '@/components/retroui/Card';
import { Dialog } from '@/components/retroui/Dialog';
import { Textarea } from '@/components/retroui/Textarea';

export default function TeacherQuestionsPage() {
  const { user } = useAuth();
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);

  if (!user || user.role !== 'teacher') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  const questions = mockQuestions;
  const stats = getQuestionStats('user-teacher-001');

  const filteredQuestions = questions.filter((q) => {
    const matchesGrade = gradeFilter === 'all' || q.grade.toString() === gradeFilter;
    const matchesDifficulty = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
    const matchesType = typeFilter === 'all' || q.type === typeFilter;
    const matchesSearch =
      q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesDifficulty && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ngân hàng câu hỏi</h1>
          <p className="text-muted-foreground">Quản lý câu hỏi cho bài học và giải đấu</p>
        </div>
        <Dialog open={isAddQuestionOpen} onOpenChange={setIsAddQuestionOpen}>
          <Dialog.Trigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm câu hỏi
            </Button>
          </Dialog.Trigger>
          <Dialog.Content size="lg">
            <Dialog.Header>Thêm câu hỏi mới</Dialog.Header>
            <div className="max-h-[60vh] space-y-4 overflow-y-auto p-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Nội dung câu hỏi</label>
                <Textarea placeholder="Nhập nội dung câu hỏi..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Khối lớp</label>
                  <Select defaultValue="6">
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Chọn khối" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="6">Lớp 6</Select.Item>
                      <Select.Item value="7">Lớp 7</Select.Item>
                      <Select.Item value="8">Lớp 8</Select.Item>
                      <Select.Item value="9">Lớp 9</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Loại câu hỏi</label>
                  <Select defaultValue="MULTIPLE_CHOICE">
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Chọn loại" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="MULTIPLE_CHOICE">Trắc nghiệm</Select.Item>
                      <Select.Item value="TRUE_FALSE">Đúng/Sai</Select.Item>
                      <Select.Item value="FILL_BLANK">Điền khuyết</Select.Item>
                      <Select.Item value="SHORT_ANSWER">Tự luận</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Độ khó</label>
                  <Select defaultValue="MEDIUM">
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Chọn độ khó" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="EASY">Dễ</Select.Item>
                      <Select.Item value="MEDIUM">Trung bình</Select.Item>
                      <Select.Item value="HARD">Khó</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Chủ đề</label>
                  <Input placeholder="VD: Phép cộng số nguyên" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Đáp án A</label>
                <Input placeholder="Nhập đáp án A" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Đáp án B</label>
                <Input placeholder="Nhập đáp án B" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Đáp án C</label>
                <Input placeholder="Nhập đáp án C" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Đáp án D</label>
                <Input placeholder="Nhập đáp án D" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Đáp án đúng</label>
                <Select defaultValue="A">
                  <Select.Trigger className="w-full">
                    <Select.Value placeholder="Chọn đáp án đúng" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="A">A</Select.Item>
                    <Select.Item value="B">B</Select.Item>
                    <Select.Item value="C">C</Select.Item>
                    <Select.Item value="D">D</Select.Item>
                  </Select.Content>
                </Select>
              </div>
            </div>
            <Dialog.Footer>
              <Button variant="outline" onClick={() => setIsAddQuestionOpen(false)}>
                Hủy
              </Button>
              <Button onClick={() => setIsAddQuestionOpen(false)}>Lưu</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <Card.Content className="p-4">
            <p className="text-muted-foreground text-sm">Tổng câu hỏi</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <p className="text-muted-foreground text-sm">Dễ</p>
            <p className="text-2xl font-bold text-green-500">{stats.byDifficulty.easy}</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <p className="text-muted-foreground text-sm">Trung bình</p>
            <p className="text-2xl font-bold text-yellow-500">{stats.byDifficulty.medium}</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <p className="text-muted-foreground text-sm">Khó</p>
            <p className="text-2xl font-bold text-red-500">{stats.byDifficulty.hard}</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <p className="text-muted-foreground text-sm">Lượt sử dụng</p>
            <p className="text-2xl font-bold">{stats.totalUsage}</p>
          </Card.Content>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative min-w-[200px] flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Tìm kiếm câu hỏi..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={gradeFilter} onValueChange={setGradeFilter}>
          <Select.Trigger className="w-[120px]">
            <Select.Value placeholder="Tất cả khối" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Tất cả khối</Select.Item>
            <Select.Item value="6">Lớp 6</Select.Item>
            <Select.Item value="7">Lớp 7</Select.Item>
            <Select.Item value="8">Lớp 8</Select.Item>
            <Select.Item value="9">Lớp 9</Select.Item>
          </Select.Content>
        </Select>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <Select.Trigger className="w-[120px]">
            <Select.Value placeholder="Độ khó" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Tất cả</Select.Item>
            <Select.Item value="EASY">Dễ</Select.Item>
            <Select.Item value="MEDIUM">Trung bình</Select.Item>
            <Select.Item value="HARD">Khó</Select.Item>
          </Select.Content>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <Select.Trigger className="w-[140px]">
            <Select.Value placeholder="Loại câu hỏi" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Tất cả</Select.Item>
            <Select.Item value="MULTIPLE_CHOICE">Trắc nghiệm</Select.Item>
            <Select.Item value="TRUE_FALSE">Đúng/Sai</Select.Item>
            <Select.Item value="FILL_BLANK">Điền khuyết</Select.Item>
            <Select.Item value="SHORT_ANSWER">Tự luận</Select.Item>
          </Select.Content>
        </Select>
      </div>

      {/* Questions List */}
      <div className="border-border bg-card border-2 shadow-sm">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Câu hỏi</Table.Head>
              <Table.Head>Chủ đề</Table.Head>
              <Table.Head>Khối</Table.Head>
              <Table.Head>Loại</Table.Head>
              <Table.Head>Độ khó</Table.Head>
              <Table.Head>Sử dụng</Table.Head>
              <Table.Head className="text-right">Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredQuestions.map((question) => (
              <Table.Row key={question.id}>
                <Table.Cell>
                  <p className="line-clamp-2 font-medium">{question.content}</p>
                  {question.options && (
                    <p className="text-muted-foreground mt-1 text-xs">
                      Đáp án: {question.correctAnswer}
                    </p>
                  )}
                </Table.Cell>
                <Table.Cell className="text-muted-foreground">{question.topic}</Table.Cell>
                <Table.Cell>Lớp {question.grade}</Table.Cell>
                <Table.Cell>
                  <Badge variant="default" size="sm">
                    {question.type === 'MULTIPLE_CHOICE'
                      ? 'Trắc nghiệm'
                      : question.type === 'TRUE_FALSE'
                        ? 'Đúng/Sai'
                        : question.type === 'FILL_BLANK'
                          ? 'Điền khuyết'
                          : 'Tự luận'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    size="sm"
                    className={
                      question.difficulty === 'EASY'
                        ? 'bg-green-100 text-green-700'
                        : question.difficulty === 'MEDIUM'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }
                  >
                    {question.difficulty === 'EASY'
                      ? 'Dễ'
                      : question.difficulty === 'MEDIUM'
                        ? 'TB'
                        : 'Khó'}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-muted-foreground">{question.usageCount} lần</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="outline" size="icon" title="Sửa">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" title="Sao chép">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-red-100" title="Xóa">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Quick Stats by Topic */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <Card.Content className="p-4">
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
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <h3 className="mb-4 font-bold">Theo khối lớp</h3>
            <div className="space-y-3">
              {Object.entries(stats.byGrade).map(([grade, count], index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-primary h-3 w-3" />
                  <span className="flex-1 text-sm">Lớp {grade}</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
