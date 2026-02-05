"use client";

import { Badge, Button, Card } from "@/components/retroui";
import { useTranslation } from "@/lib/providers";
import { Download, FileText, Filter, MoreHorizontal, Printer } from "lucide-react";

const REPORTS = [
  { id: 1, name: "Quarterly Performance Review Q4", type: "Academic", date: "Dec 31, 2024", size: "2.4 MB" },
  { id: 2, name: "Student Attendance Summary", type: "Administrative", date: "Jan 15, 2025", size: "1.1 MB" }, 
  { id: 3, name: "Class Assessment Results", type: "Academic", date: "Jan 20, 2025", size: "3.2 MB" },
  { id: 4, name: "Yearly Progress Forecast", type: "Analytics", date: "Jan 25, 2025", size: "1.8 MB" },
  { id: 5, name: "Parent-Teacher Meeting Log", type: "Administrative", date: "Feb 01, 2025", size: "0.5 MB" },
];

export default function ReportsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {t("navigation.sidebar.reports")}
          </h1>
          <p className="text-muted-foreground mt-1">
            Access and manage academic and administrative reports
          </p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            <span>New Report</span>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Report Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Date Generated</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {REPORTS.map((report) => (
                <tr key={report.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      {report.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="default" className="font-medium">
                      {report.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{report.date}</td>
                  <td className="px-6 py-4 text-muted-foreground">{report.size}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Download">
                         <Download className="h-4 w-4" />
                       </Button>
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Print">
                         <Printer className="h-4 w-4" />
                       </Button>
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                         <MoreHorizontal className="h-4 w-4" />
                       </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-center">
            <Button variant="link" className="text-primary hover:text-primary/80">Load More Reports</Button>
         </div>
      </Card>
    </div>
  );
}
