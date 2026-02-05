"use client";

import { Avatar, Button, Card } from "@/components/retroui";
import { useTranslation } from "@/lib/providers";
import { Award, BookOpen, Clock, MoreVertical, Plus } from "lucide-react";
import Link from 'next/link';

// Mock data
const CHILDREN = [
  {
    id: 1,
    name: "Alex Johnson",
    age: 10,
    grade: "Grade 5",
    avatarColor: "bg-blue-500",
    stats: {
       avgScore: 92,
       completedLessons: 145,
       studyTime: "24h 30m"
    }
  },
  {
    id: 2,
    name: "Sarah Johnson",
    age: 8,
    grade: "Grade 3",
    avatarColor: "bg-pink-500",
    stats: {
       avgScore: 88,
       completedLessons: 98,
       studyTime: "18h 45m"
    }
  }
];

export default function MyChildrenPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
         <div>
          <h1 className="text-3xl font-bold">
            {t("navigation.sidebar.myChildren")}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage profiles and view overview for your children
          </p>
         </div>
         <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Child</span>
         </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CHILDREN.map((child) => (
          <Card key={child.id} className="group overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all">
            <Card.Content className="p-6">
              <div className="flex items-start justify-between mb-6">
                 <div className="flex items-center gap-4">
                    <Avatar className={`h-14 w-14 border-none shadow-sm`}>
                      <Avatar.Fallback className={`${child.avatarColor} text-white font-bold text-xl`}>
                        {child.name.charAt(0)}
                      </Avatar.Fallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold">{child.name}</h3>
                      <p className="text-muted-foreground text-sm">{child.grade} • {child.age} Years Old</p>
                    </div>
                 </div>
                 <Button variant="ghost" size="icon" className="hover:bg-muted rounded-full">
                   <MoreVertical className="h-5 w-5" />
                 </Button>
              </div>

              <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-border mb-4">
                 <div className="text-center">
                    <div className="text-lg font-bold">{child.stats.avgScore}%</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                       <Award className="h-3 w-3" /> Score
                    </div>
                 </div>
                 <div className="text-center border-l border-r border-border">
                    <div className="text-lg font-bold">{child.stats.completedLessons}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                       <BookOpen className="h-3 w-3" /> Lessons
                    </div>
                 </div>
                 <div className="text-center">
                    <div className="text-lg font-bold">{child.stats.studyTime.split(' ')[0]}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                       <Clock className="h-3 w-3" /> Hours
                    </div>
                 </div>
              </div>

              <div className="flex gap-2">
                <Link href="/dashboard/children/progress" className="flex-1" legacyBehavior passHref>
                   <Button asChild variant="secondary" className="w-full">
                     <a>View Progress</a>
                   </Button>
                </Link>
                <Link href="/dashboard/children/activities" className="flex-1" legacyBehavior passHref>
                   <Button asChild variant="outline" className="w-full">
                     <a>Activity Log</a>
                   </Button>
                </Link>
              </div>
            </Card.Content>
          </Card>
        ))}
        
        {/* Add New Card Placeholder */}
        <button className="border-border border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all min-h-[280px]">
           <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Plus className="h-6 w-6" />
           </div>
           <h3 className="font-medium">Add another child</h3>
        </button>
      </div>
    </div>
  );
}
