"use client";

import { Badge, Button, Card, Input, Progress } from "@/components/retroui";
import { useTranslation } from "@/lib/providers";
import { Mail, MoreVertical, SlidersHorizontal, User } from "lucide-react";
import { useState } from "react";

// Mock data
const ALL_STUDENTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `student-${i + 1}`,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@example.com`,
  grade: ["Grade 1", "Grade 2", "Grade 3"][i % 3],
  status: i % 5 === 0 ? "inactive" : "active",
  progress: Math.floor(Math.random() * 100),
  lastActive: "2 hours ago",
  joinedDate: "Jan 15, 2024",
}));

export default function StudentsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = ALL_STUDENTS.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {t("navigation.sidebar.allStudents")}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your students and view their performance
          </p>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-full min-w-[250px]">
            <Input 
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="group overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all">
            <Card.Content className="p-6">
              <div className="mb-4 flex items-start justify-between">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                   <User className="h-6 w-6" />
                 </div>
                 <Badge variant={student.status === 'active' ? 'surface' : 'default'} className={student.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-transparent' : ''}>
                   {student.status === 'active' ? 'Active' : 'Inactive'}
                 </Badge>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold">{student.name}</h3>
                <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-1">
                  <Mail className="h-3 w-3" />
                  {student.email}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} />
                </div>

                 <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                   <span>Grade: <span className="text-foreground font-medium">{student.grade}</span></span>
                   <span>Active: {student.lastActive}</span>
                 </div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}
