"use client";

import { useState, useEffect } from "react";
import { api, Navigation } from "@/lib/api";
import { alertSuccess, alertError } from "@/lib/alerts";
import { WsTable } from "@/components/admin/ws-table";
import { NavigationEditDialog } from "@/components/sections/admin/navigation-edit-dialog";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { ArrowUp, ArrowDown } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type NavForm = Omit<Navigation, "id" | "createdAt" | "updatedAt">;

const emptyForm: NavForm = {
  label: "",
  href: "",
  icon: "",
  order: 0,
  isActive: true,
};

export function NavigationSection() {
  const [items, setItems] = useState<Navigation[]>([]);
  const [form, setForm] = useState<NavForm>(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await api.navigation.list();
      setItems(data);
    } catch {
      alertError("Lỗi khi tải điều hướng");
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
        await api.navigation.update(editingId, payload);
        alertSuccess("Đã cập nhật điều hướng");
      } else {
        await api.navigation.create(payload);
        alertSuccess("Đã tạo điều hướng");
      }
      setDialogOpen(false);
      setForm(emptyForm);
      setEditingId("");
      await load();
    } catch {
      alertError("Có lỗi xảy ra khi lưu điều hướng");
    } finally {
      setLoading(false);
    }
  }

  async function handleReorder(id: string, direction: "up" | "down") {
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return;
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= items.length) return;

    const current = items[index];
    const swap = items[swapIndex];

    try {
      await Promise.all([
        api.navigation.update(current.id, { order: swap.order || 0 }),
        api.navigation.update(swap.id, { order: current.order || 0 }),
      ]);
      await load();
    } catch {
      alertError("Lỗi khi sắp xếp");
    }
  }

  function handleOpenCreate() {
    setForm(emptyForm);
    setEditingId("");
    setDialogOpen(true);
  }

  function handleOpenEdit(item: Navigation) {
    setEditingId(item.id);
    setForm({
      label: item.label,
      href: item.href,
      icon: item.icon || "",
      order: item.order || 0,
      isActive: item.isActive !== false,
    });
    setDialogOpen(true);
  }

  async function handleDelete(id: string) {
    try {
      await api.navigation.remove(id);
      alertSuccess("Đã xóa điều hướng");
      await load();
    } catch {
      alertError("Lỗi khi xóa");
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Danh sách điều hướng</h2>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
        >
          Tạo mới
        </Button>
      </div>
      <WsTable
        cols={["Nhãn", "Đường dẫn", "Thứ tự"]}
        rows={items.map((item, index) => ({
          key: item.id,
          cells: [
            <div key="label" className="flex items-center gap-2">
              <span
                className={`size-2 rounded-full ${item.isActive !== false ? "bg-green-500" : "bg-muted-foreground/30"}`}
              />
              <p className="text-sm font-medium">{item.label}</p>
            </div>,
            <span
              key="href"
              className="text-xs text-muted-foreground font-mono"
            >
              {item.href}
            </span>,
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontVariantNumeric: "tabular-nums" }}
              >
                {item.order ?? 0}
              </Typography>

              <Tooltip title="Di chuyển lên">
                <span>
                  <IconButton
                    size="small"
                    onClick={() => handleReorder(item.id, "up")}
                    disabled={index === 0}
                  >
                    <ArrowUp size={16} />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="Di chuyển xuống">
                <span>
                  <IconButton
                    size="small"
                    onClick={() => handleReorder(item.id, "down")}
                    disabled={index === items.length - 1}
                  >
                    <ArrowDown size={16} />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>,
          ],
          onEdit: () => handleOpenEdit(item),
          onDelete: () => handleDelete(item.id),
        }))}
      />
      <NavigationEditDialog
        nav={form}
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
