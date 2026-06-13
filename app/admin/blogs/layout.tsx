import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function BlogAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const adminEmail =
    process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!session?.user?.email || session.user.email !== adminEmail) {
    redirect("/login?callbackUrl=/admin/blogs");
  }

  return <>{children}</>;
}
