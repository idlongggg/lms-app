import { Search } from "lucide-react";

import { Input } from "@/components/retroui/Input";
import { Select } from "@/components/retroui/Select";

interface AlertsFilterProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  severityFilter: string;
  setSeverityFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export function AlertsFilter({
  searchQuery,
  setSearchQuery,
  severityFilter,
  setSeverityFilter,
  statusFilter,
  setStatusFilter,
}: AlertsFilterProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="relative min-w-[200px] flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Tìm kiếm cảnh báo..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select value={severityFilter} onValueChange={setSeverityFilter}>
        <Select.Trigger className="w-[150px]">
          <Select.Value placeholder="Tất cả mức độ" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="all">Tất cả mức độ</Select.Item>
          <Select.Item value="critical">Critical</Select.Item>
          <Select.Item value="warning">Warning</Select.Item>
          <Select.Item value="info">Info</Select.Item>
        </Select.Content>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <Select.Trigger className="w-[150px]">
          <Select.Value placeholder="Trạng thái" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="all">Tất cả</Select.Item>
          <Select.Item value="active">Active</Select.Item>
          <Select.Item value="acknowledged">Acknowledged</Select.Item>
          <Select.Item value="resolved">Resolved</Select.Item>
        </Select.Content>
      </Select>
    </div>
  );
}
