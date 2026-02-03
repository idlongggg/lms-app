import { FileText, Search, Plus, Folder, MoreVertical } from 'lucide-react';

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý nội dung</h1>
          <p className="text-muted-foreground">Quản lý bài học, câu hỏi và tài liệu</p>
        </div>
        <button className="border-border bg-primary inline-flex items-center gap-2 border-2 px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
          <Plus className="h-4 w-4" />
          Thêm nội dung
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="border-border bg-input flex flex-1 items-center gap-2 border-2 px-3 py-2 shadow-xs">
          <Search className="text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm nội dung..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <select className="border-border bg-input border-2 px-4 py-2 shadow-xs">
          <option>Tất cả môn học</option>
          <option>Toán học</option>
          <option>Tiếng Anh</option>
          <option>Vật lý</option>
        </select>
        <select className="border-border bg-input border-2 px-4 py-2 shadow-xs">
          <option>Loại nội dung</option>
          <option>Bài học</option>
          <option>Câu hỏi</option>
          <option>Tài liệu</option>
        </select>
      </div>

      {/* Content Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contents.map((content, index) => (
          <div
            key={index}
            className="border-border bg-card border-2 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="border-border bg-muted flex items-start justify-between border-b-2 p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`border-border flex h-10 w-10 items-center justify-center border-2 ${content.type === 'folder' ? 'bg-accent' : 'bg-primary'}`}
                >
                  {content.type === 'folder' ? (
                    <Folder className="h-5 w-5" />
                  ) : (
                    <FileText className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{content.title}</h3>
                  <p className="text-muted-foreground text-sm">{content.subject}</p>
                </div>
              </div>
              <button className="hover:bg-background p-1 transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{content.items} items</span>
                <span
                  className={`border-border border px-2 py-0.5 text-xs ${content.status === 'Published' ? 'bg-green-500/20 text-green-500' : 'bg-muted'}`}
                >
                  {content.status}
                </span>
              </div>
              <p className="text-muted-foreground mt-2 text-xs">Cập nhật: {content.updatedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const contents = [
  {
    title: 'Đại số cơ bản',
    subject: 'Toán học',
    type: 'folder',
    items: 15,
    status: 'Published',
    updatedAt: '2 giờ trước',
  },
  {
    title: 'Ngữ pháp tiếng Anh',
    subject: 'Tiếng Anh',
    type: 'folder',
    items: 20,
    status: 'Published',
    updatedAt: '1 ngày trước',
  },
  {
    title: 'Vật lý lớp 10',
    subject: 'Vật lý',
    type: 'folder',
    items: 12,
    status: 'Draft',
    updatedAt: '3 ngày trước',
  },
  {
    title: 'Lịch sử Việt Nam',
    subject: 'Lịch sử',
    type: 'lesson',
    items: 8,
    status: 'Published',
    updatedAt: '1 tuần trước',
  },
  {
    title: 'Hóa học đại cương',
    subject: 'Hóa học',
    type: 'folder',
    items: 18,
    status: 'Draft',
    updatedAt: '2 tuần trước',
  },
  {
    title: 'Sinh học tế bào',
    subject: 'Sinh học',
    type: 'lesson',
    items: 10,
    status: 'Published',
    updatedAt: '1 tháng trước',
  },
];
