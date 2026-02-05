"use client";

import { Button, Card } from "@/components/retroui";
import { useTranslation } from "@/lib/providers";
import { ArrowUpRight, Award, BookOpen, Clock, Target, TrendingUp } from "lucide-react";

// Mock data for stats
const STATS = [
  {
    label: "Total Study Time",
    value: "124h",
    change: "+12%",
    icon: Clock,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Lessons Completed",
    value: "45",
    change: "+5",
    icon: BookOpen,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Achievements",
    value: "12",
    change: "+2",
    icon: Award,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    label: "Average Score",
    value: "92%",
    change: "+4%",
    icon: Target,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const RECENT_ACTIVITY = [
   { title: "Completed Math Quiz: Algebra", score: "95%", time: "2 hours ago" },
   { title: "Started Physics Module: Forces", score: null, time: "Yesterday" },
   { title: "Earned Badge: Fast Learner", score: null, time: "Yesterday" },
   { title: "Completed History Essay", score: "88%", time: "2 days ago" }, 
];

export default function AllProgressPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {t("navigation.sidebar.allProgress")}
        </h1>
        <p className="text-muted-foreground mt-1">
          Track learning journey and performance analytics
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Card key={i}>
             <Card.Content className="p-6">
               <div className="flex items-center justify-between mb-4">
                 <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                   <stat.icon className="h-6 w-6" />
                 </div>
                 <div className="flex items-center gap-1 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                   <TrendingUp className="h-3 w-3" />
                   {stat.change}
                 </div>
               </div>
               <div>
                 <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                 <h3 className="text-2xl font-bold">{stat.value}</h3>
               </div>
             </Card.Content>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <Card.Content className="p-6">
            <h3 className="text-lg font-bold mb-6">Weekly Activity</h3>
            <div className="h-[300px] flex items-end justify-between gap-2">
              {[65, 40, 85, 35, 60, 90, 50].map((h, i) => (
                 <div key={i} className="w-full bg-secondary/30 rounded-t-lg relative group">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-primary/80 hover:bg-primary transition-all rounded-t-lg"
                      style={{ height: `${h}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg transition-opacity">
                        {h}m
                      </div>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                      {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}
                    </div>
                 </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        <Card>
           <Card.Content className="p-6">
             <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
             <div className="space-y-6">
               {RECENT_ACTIVITY.map((item, i) => (
                 <div key={i} className="flex items-start gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                        {item.score && (
                          <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded dark:bg-green-900/30 dark:text-green-400">
                            {item.score}
                          </span>
                        )}
                      </div>
                    </div>
                 </div>
               ))}
             </div>
             <Button variant="ghost" className="w-full mt-6 gap-1 text-primary hover:text-primary hover:bg-primary/5">
               View History
               <ArrowUpRight className="h-4 w-4" />
             </Button>
           </Card.Content>
        </Card>
      </div>
    </div>
  );
}
