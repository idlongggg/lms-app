import { BookOpen, Clock, Filter, Star, Users } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'React.js từ cơ bản đến nâng cao',
    description: 'Học React từ đầu với hooks, context, và các patterns phổ biến',
    thumbnail: '⚛️',
    lessons: 45,
    duration: '25h',
    students: 1250,
    rating: 4.8,
    level: 'Trung bình',
    category: 'Frontend',
  },
  {
    id: 2,
    title: 'Node.js & Express Backend',
    description: 'Xây dựng REST API với Node.js, Express và MongoDB',
    thumbnail: '🟢',
    lessons: 38,
    duration: '20h',
    students: 890,
    rating: 4.7,
    level: 'Trung bình',
    category: 'Backend',
  },
  {
    id: 3,
    title: 'Python cho người mới bắt đầu',
    description: 'Nhập môn lập trình với Python - ngôn ngữ dễ học nhất',
    thumbnail: '🐍',
    lessons: 30,
    duration: '15h',
    students: 2100,
    rating: 4.9,
    level: 'Cơ bản',
    category: 'Programming',
  },
  {
    id: 4,
    title: 'SQL & Database Design',
    description: 'Thiết kế cơ sở dữ liệu và viết truy vấn SQL hiệu quả',
    thumbnail: '🗄️',
    lessons: 25,
    duration: '12h',
    students: 750,
    rating: 4.6,
    level: 'Cơ bản',
    category: 'Database',
  },
  {
    id: 5,
    title: 'Docker & Kubernetes',
    description: 'Container hóa ứng dụng và triển khai với Kubernetes',
    thumbnail: '🐳',
    lessons: 32,
    duration: '18h',
    students: 520,
    rating: 4.5,
    level: 'Nâng cao',
    category: 'DevOps',
  },
  {
    id: 6,
    title: 'Next.js Full-stack Development',
    description: 'Xây dựng ứng dụng full-stack với Next.js 14 App Router',
    thumbnail: '▲',
    lessons: 40,
    duration: '22h',
    students: 680,
    rating: 4.8,
    level: 'Nâng cao',
    category: 'Frontend',
  },
];

const categories = ['Tất cả', 'Frontend', 'Backend', 'Database', 'DevOps', 'Programming'];
const levels = ['Tất cả', 'Cơ bản', 'Trung bình', 'Nâng cao'];

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Tất cả khóa học</h1>
        <p className="text-muted-foreground">Khám phá hơn 100+ khóa học chất lượng</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <span className="text-sm font-medium">Lọc:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`border-border hover:bg-muted border-2 px-3 py-1 text-sm font-medium transition-all ${
                cat === 'Tất cả' ? 'bg-primary' : 'bg-background'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="sm:ml-auto">
          <select className="border-border bg-background border-2 px-3 py-1.5 text-sm">
            <option>Phổ biến nhất</option>
            <option>Mới nhất</option>
            <option>Đánh giá cao</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border-border bg-background flex flex-col border-2 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Thumbnail */}
            <div className="border-border bg-muted flex h-32 items-center justify-center border-b-2 text-5xl">
              {course.thumbnail}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="border-border bg-muted border px-2 py-0.5 text-xs font-medium">
                  {course.category}
                </span>
                <span className="border-border bg-secondary/20 border px-2 py-0.5 text-xs font-medium">
                  {course.level}
                </span>
              </div>

              <h3 className="font-bold">{course.title}</h3>
              <p className="text-muted-foreground mt-1 line-clamp-2 flex-1 text-sm">
                {course.description}
              </p>

              <div className="text-muted-foreground mt-3 flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {course.lessons}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.students}
                </span>
              </div>

              <div className="border-border mt-3 flex items-center justify-between border-t-2 pt-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <button className="border-border bg-primary border-2 px-4 py-1.5 text-sm font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="border-border bg-background border-2 px-8 py-3 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
          Xem thêm khóa học
        </button>
      </div>
    </div>
  );
}
