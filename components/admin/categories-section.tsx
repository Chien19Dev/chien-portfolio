"use client";

import { useState, useEffect } from "react";
import { api, ProjectCategory } from "@/lib/api";
import { alertSuccess, alertError } from "@/lib/alerts";
import { WsTable } from "@/components/admin/ws-table";
import { CategoryEditDialog } from "@/components/sections/admin/category-edit-dialog";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

type CategoryForm = Omit<ProjectCategory, "id" | "createdAt" | "updatedAt">;

const emptyForm: CategoryForm = {
  name: "",
  slug: "",
  description: "",
  order: 0,
};

export function CategoriesSection() {
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await api.categories.list();
      setCategories(data as any[]);
    } catch {
      alertError("Lỗi khi tải danh mục");
    }
  }

  async function handleSave() {
    setLoading(true);
    try {
      const payload = {
        ...form,
        order: Number(form.order || 0),
      };
      if (editingId) {
        await api.categories.update(editingId, payload);
        alertSuccess("Đã cập nhật danh mục");
      } else {
        await api.categories.create(payload);
        alertSuccess("Đã tạo danh mục");
      }
      setDialogOpen(false);
      setForm(emptyForm);
      setEditingId("");
      await load();
    } catch {
      alertError("Có lỗi xảy ra khi lưu danh mục");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenCreate() {
    setForm(emptyForm);
    setEditingId("");
    setDialogOpen(true);
  }

  function handleOpenEdit(item: any) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      slug: item.slug,
      description: item.description || "",
      order: item.order || 0,
    });
    setDialogOpen(true);
  }

  async function handleDelete(id: string) {
    try {
      await api.categories.remove(id);
      alertSuccess("Đã xóa danh mục");
      await load();
    } catch {
      alertError("Lỗi khi xóa");
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh mục dự án</h2>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
        >
          Tạo mới
        </Button>
      </div>
      <WsTable
        cols={["Danh mục", "Slug", "Dự án"]}
        rows={categories.map((item) => ({
          key: item.id,
          cells: [
            <p key="name" className="text-sm font-medium">
              {item.name}
            </p>,
            <span
              key="slug"
              className="text-xs text-muted-foreground font-mono"
            >
              {item.slug}
            </span>,
            <span
              key="count"
              className="text-xs tabular-nums text-primary font-medium"
            >
              {item._count?.projects ?? 0}
            </span>,
          ],
          onEdit: () => handleOpenEdit(item),
          onDelete: () => handleDelete(item.id),
        }))}
      />
      <CategoryEditDialog
        category={form}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onChange={setForm}
        onSave={handleSave}
        isEditing={!!editingId}
        loading={loading}
      />
    </div>
  );
}
