import type { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { api, Project } from "@/lib/api";
import { alertSuccess, alertError } from "@/lib/alerts";
import { WorkspaceSplit } from "@/components/admin/workspace-split";
import { WsField } from "@/components/admin/ws-field";
import { WsSubmit } from "@/components/admin/ws-submit";
import { WsTable } from "@/components/admin/ws-table";


type ProjectForm = Omit<Project, "id" | "createdAt" | "updatedAt"> & {
  technologiesText: string;
};

interface Props {
  projects: Project[];
  form: ProjectForm;
  editingId: string;
  onChange: (f: ProjectForm) => void;
  onSubmit: (e: FormEvent) => void;
  onEdit: (item: Project) => void;
  onReload: () => void;
  emptyForm: ProjectForm;
  setEditingId: (id: string) => void;
}

export function ProjectsSection({
  projects,
  form,
  editingId,
  onChange,
  onSubmit,
  onEdit,
  onReload,
  emptyForm,
  setEditingId,
}: Props) {
  return (
    <WorkspaceSplit
      form={
        <form onSubmit={onSubmit} className="space-y-2">
          <WsField label="Tên dự án">
            <Input
              value={form.title}
              onChange={(e) => onChange({ ...form, title: e.target.value })}
              required
            />
          </WsField>
          <WsField label="Mô tả">
            <Textarea
              value={form.description}
              onChange={(e) =>
                onChange({ ...form, description: e.target.value })
              }
              required
              rows={3}
            />
          </WsField>
          <WsField label="Ảnh (URL)">
            <Input
              value={form.image || ""}
              onChange={(e) => onChange({ ...form, image: e.target.value })}
            />
          </WsField>
          <WsField label="Công nghệ (phân cách bằng dấu phẩy)">
            <Input
              value={form.technologiesText}
              onChange={(e) =>
                onChange({ ...form, technologiesText: e.target.value })
              }
            />
          </WsField>
          <WsField label="GitHub URL">
            <Input
              value={form.githubUrl || ""}
              onChange={(e) => onChange({ ...form, githubUrl: e.target.value })}
            />
          </WsField>
          <WsField label="Demo URL">
            <Input
              value={form.demoUrl || ""}
              onChange={(e) => onChange({ ...form, demoUrl: e.target.value })}
            />
          </WsField>
          <WsSubmit
            isEditing={!!editingId}
            label="dự án"
            onCancel={
              editingId
                ? () => {
                    onChange(emptyForm);
                    setEditingId("");
                  }
                : undefined
            }
          />
        </form>
      }
      list={
        <WsTable
          cols={["Dự án", "Công nghệ"]}
          rows={projects.map((item) => ({
            key: item.id,
            cells: [
              <p key="title" className="text-sm font-medium truncate">
                {item.title}
              </p>,
              <div key="tags" className="flex flex-wrap gap-1">
                {(item.technologies || []).slice(0, 3).map((t) => (
                  <Badge key={t} variant="outline" size="sm">
                    {t}
                  </Badge>
                ))}
                {(item.technologies || []).length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{(item.technologies || []).length - 3}
                  </span>
                )}
              </div>,
            ],
            onEdit: () => onEdit(item),
            onDelete: async () => {
              try {
                await api.projects.remove(item.id);
                alertSuccess("Đã xóa dự án");
                onReload();
              } catch {
                alertError("Lỗi khi xóa");
              }
            },
          }))}
        />
      }
    />
  );
}
