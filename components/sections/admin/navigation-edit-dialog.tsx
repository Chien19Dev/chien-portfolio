"use client";

import type { Navigation } from "@/lib/api";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import DialogComponent from "@/components/common/dialog-component";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Link, Hash, Star } from "lucide-react";

type NavForm = Omit<Navigation, "id" | "createdAt" | "updatedAt">;

interface Props {
  nav: NavForm;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (f: NavForm) => void;
  onSave: () => void;
  isEditing: boolean;
  loading?: boolean;
}

export function NavigationEditDialog({
  nav,
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
      title={isEditing ? "Chỉnh sửa điều hướng" : "Tạo điều hướng mới"}
      description={
        isEditing
          ? "Cập nhật thông tin điều hướng"
          : "Thêm điều hướng mới vào danh sách"
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
          label="Nhãn"
          value={nav.label}
          onChange={(e) => onChange({ ...nav, label: e.target.value })}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Link className="size-4 text-muted-foreground" />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Đường dẫn (href)"
          value={nav.href}
          onChange={(e) => onChange({ ...nav, href: e.target.value })}
          placeholder="/blog"
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Link className="size-4 text-muted-foreground" />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Icon (tên Lucide)"
          value={nav.icon || ""}
          onChange={(e) => onChange({ ...nav, icon: e.target.value })}
          placeholder="BookOpen"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Star className="size-4 text-muted-foreground" />
                </InputAdornment>
              ),
            },
          }}
        />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Thứ tự"
              type="number"
              value={nav.order || 0}
              onChange={(e) => onChange({ ...nav, order: Number(e.target.value) })}
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
        <FormControlLabel
          control={
            <Switch
              checked={nav.isActive !== false}
              onChange={(e) =>
                onChange({ ...nav, isActive: e.target.checked })
              }
            />
          }
          label={nav.isActive !== false ? "Hiện" : "Ẩn"}
        />
      </Stack>
    </DialogComponent>
  );
}
