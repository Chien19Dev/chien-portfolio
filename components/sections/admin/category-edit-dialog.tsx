"use client";

import type { ProjectCategory } from "@/lib/api";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import DialogComponent from "@/components/common/dialog-component";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Folder, Hash } from "lucide-react";

type CategoryForm = Omit<ProjectCategory, "id" | "createdAt" | "updatedAt">;

interface Props {
  category: CategoryForm;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (f: CategoryForm) => void;
  onSave: () => void;
  isEditing: boolean;
  loading?: boolean;
}

export function CategoryEditDialog({
  category,
  open,
  onOpenChange,
  onChange,
  onSave,
  isEditing,
  loading = false,
}: Props) {
  return (
    <DialogComponent
      open={open}
      onClose={() => onOpenChange(false)}
      title={isEditing ? "Chỉnh sửa danh mục" : "Tạo danh mục mới"}
      description={
        isEditing
          ? "Cập nhật thông tin danh mục"
          : "Thêm danh mục mới vào danh sách"
      }
      maxWidth="sm"
      loading={loading}
      confirmText={
        loading
          ? isEditing
            ? "Đang cập nhật..."
            : "Đang tạo..."
          : isEditing
            ? "Cập nhật"
            : "Xác nhận"
      }
      cancelText="Huỷ"
      confirmColor="primary"
      isEditing={isEditing}
      onConfirm={onSave}
    >
      <Stack spacing={3} sx={{ mt: 1 }}>
        <TextField
          label="Tên danh mục"
          value={category.name}
          onChange={(e) => {
            const name = e.target.value;
            onChange({
              ...category,
              name,
              slug:
                category.slug ||
                name
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, ""),
            });
          }}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Folder className="size-4 text-muted-foreground" />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Slug"
          value={category.slug}
          onChange={(e) => onChange({ ...category, slug: e.target.value })}
          required
        />
        <TextField
          label="Mô tả"
          value={category.description || ""}
          onChange={(e) =>
            onChange({ ...category, description: e.target.value })
          }
          multiline
          rows={3}
        />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Thứ tự"
              type="number"
              value={category.order || 0}
              onChange={(e) =>
                onChange({ ...category, order: Number(e.target.value) })
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Hash className="size-4 text-muted-foreground" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>
      </Stack>
    </DialogComponent>
  );
}
