import { ContactMessage } from "@/lib/api";
import { ContactCard } from "../admin/contact-card";


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
        <p className="text-sm text-muted-foreground">Chưa có tin nhắn nào.</p>
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
