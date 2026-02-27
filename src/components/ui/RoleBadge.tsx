import { Badge } from "./Badge";

type Role = "admin" | "teacher" | "student" | "parent" | "root";

interface RoleBadgeProps {
  role: Role;
  color?: string;
  className?: string;
}

const roleColors: Record<Role, string> = {
  admin: "bg-red-500 text-white",
  teacher: "bg-purple-500 text-white",
  student: "bg-blue-500 text-white",
  parent: "bg-green-500 text-white",
  root: "bg-orange-500 text-white",
};

const roleLabels: Record<Role, string> = {
  admin: "Quản trị viên",
  teacher: "Giáo viên",
  student: "Học sinh",
  parent: "Phụ huynh",
  root: "Super Admin",
};

export function RoleBadge({ role, color, className }: RoleBadgeProps) {
  const bgColor = color || roleColors[role] || roleColors.student;

  return (
    <Badge className={className} style={{ backgroundColor: bgColor }}>
      {roleLabels[role]}
    </Badge>
  );
}
