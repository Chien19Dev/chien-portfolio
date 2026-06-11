import { ContactCard } from "@/components/admin/contact-card";
import { Label } from "@/components/ui/label";
import { ContactMessage } from "@/lib/api";

export function ContactsSection({
  contacts,
  onReload,
}: {
  contacts: ContactMessage[];
  onReload: () => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      {contacts.length === 0 ? (
        <Label className="text-sm text-muted-foreground">
          Chưa có tin nhắn nào.
        </Label>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {contacts.map((item) => (
            <ContactCard key={item.id} item={item} onReload={onReload} />
          ))}
        </div>
      )}
    </div>
  );
}
