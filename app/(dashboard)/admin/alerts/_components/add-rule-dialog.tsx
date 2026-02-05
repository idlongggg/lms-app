import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface AddRuleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddRuleDialog({ isOpen, onOpenChange }: AddRuleDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm quy tắc
        </Button>
      </Dialog.Trigger>
      <Dialog.Content size="md">
        <Dialog.Header>Thêm quy tắc cảnh báo</Dialog.Header>
        <div className="space-y-4 p-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Tên quy tắc
            </label>
            <Input placeholder="VD: CPU > 90%" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Mức độ</label>
            <Select defaultValue="warning">
              <Select.Trigger className="w-full">
                <Select.Value placeholder="Chọn mức độ" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="critical">Critical</Select.Item>
                <Select.Item value="warning">Warning</Select.Item>
                <Select.Item value="info">Info</Select.Item>
              </Select.Content>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Kênh thông báo
            </label>
            <Input placeholder="Email, Slack, SMS" />
          </div>
        </div>
        <Dialog.Footer>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={() => onOpenChange(false)}>Lưu</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
