import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function BlogAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  return <>{children}</>;
}
