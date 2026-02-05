"use client";

import { Button, Card } from "@/components/retroui";
import { useTranslation } from "@/lib/providers";
import { ArrowLeft, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

// Mock data
const SUBJECTS = [
  { name: "Mathematics", progress: 85, color: "bg-blue-500", totalLessons: 40, completed: 34 },
  { name: "Science", progress: 72, color: "bg-green-500", totalLessons: 35, completed: 25 },
  { name: "English", progress: 90, color: "bg-purple-500", totalLessons: 50, completed: 45 },
  { name: "History", progress: 60, color: "bg-orange-500", totalLessons: 30, completed: 18 },
  { name: "Art", progress: 95, color: "bg-pink-500", totalLessons: 20, completed: 19 },
];

export default function ChildProgressPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
         <Link href="/dashboard/children">
           <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-6 w-6" />
           </Button>
         </Link>
         <div>
            <h1 className="text-3xl font-bold">
              {t("navigation.sidebar.childProgress")}
            </h1>
            <p className="text-muted-foreground">
              Detailed breakdown of academic performance
            </p>
         </div>
       </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         {/* Overall Progress Card */}
         <Card className="md:col-span-2 lg:col-span-1 border-2 shadow-sm">
           <Card.Content className="p-6">
             <h3 className="font-bold text-lg mb-6">Overall Progress</h3>
             <div className="flex items-center justify-center py-4">
               <div className="relative h-48 w-48 rounded-full border-[12px] border-secondary flex items-center justify-center">
                   <div className="absolute inset-0 rounded-full border-[12px] border-primary border-r-transparent rotate-45" />
                   <div className="text-center">
                     <div className="text-4xl font-bold">82%</div>
                     <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Completion</div>
                   </div>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-4 mt-8">
               <div className="bg-secondary/30 p-3 rounded-lg text-center">
                 <div className="text-2xl font-bold">142</div>
                 <div className="text-xs text-muted-foreground">Lessons Done</div>
               </div>
               <div className="bg-secondary/30 p-3 rounded-lg text-center">
                 <div className="text-2xl font-bold">124h</div>
                 <div className="text-xs text-muted-foreground">Study Time</div>
               </div>
             </div>
           </Card.Content>
         </Card>

         {/* Subjects Grid */}
         <Card className="md:col-span-2 border-2 shadow-sm">
           <Card.Content className="p-6">
             <h3 className="font-bold text-lg mb-6">Subject Performance</h3>
             <div className="space-y-6">
               {SUBJECTS.map((subject) => (
                 <div key={subject.name} className="space-y-2">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className={`h-10 w-10 ${subject.color} rounded-lg bg-opacity-10 flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                         {subject.name.charAt(0)}
                       </div>
                       <div>
                         <div className="font-medium">{subject.name}</div>
                         <div className="text-xs text-muted-foreground">{subject.completed}/{subject.totalLessons} Lessons</div>
                       </div>
                     </div>
                     <div className="font-bold">{subject.progress}%</div>
                   </div>
                   <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                     <div 
                       className={`h-full ${subject.color} transition-all duration-500`} 
                       style={{ width: `${subject.progress}%` }}
                     />
                   </div>
                 </div>
               ))}
             </div>
           </Card.Content>
         </Card>
       </div>

       <div className="grid gap-6 md:grid-cols-2">
         <Card className="shadow-sm">
            <Card.Content className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 flex items-center justify-center">
                  <Clock className="h-4 w-4" />
                </div>
                <h3 className="font-bold">Next Recommended</h3>
              </div>
              <div className="space-y-3">
                 <div className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">Algebra: Linear Equations</h4>
                        <p className="text-xs text-muted-foreground mt-1">Mathematics • 15 mins</p>
                      </div>
                      <Button size="sm" className="h-7 text-xs">Start</Button>
                    </div>
                 </div>
                 <div className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">Biology: Photosynthesis</h4>
                        <p className="text-xs text-muted-foreground mt-1">Science • 20 mins</p>
                      </div>
                      <Button size="sm" className="h-7 text-xs">Start</Button>
                    </div>
                 </div>
              </div>
            </Card.Content>
         </Card>

         <Card className="shadow-sm">
            <Card.Content className="p-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                   <CheckCircle className="h-4 w-4" />
                 </div>
                 <h3 className="font-bold">Recent Achievements</h3>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                   <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                     🏆
                   </div>
                   <div>
                     <h4 className="font-medium">Math Whiz</h4>
                     <p className="text-sm text-muted-foreground">Scored 100% in 5 math quizzes consecutively</p>
                     <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                     📚
                   </div>
                   <div>
                     <h4 className="font-medium">Bookworm</h4>
                     <p className="text-sm text-muted-foreground">Completed 50 reading lessons</p>
                     <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                   </div>
                 </div>
              </div>
            </Card.Content>
         </Card>
       </div>
    </div>
  );
}
