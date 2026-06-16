import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex h-[calc(100vh-var(--navbar-height,4rem))] overflow-hidden">
      <main className="flex-1 flex flex-col min-h-0">{children} </main>
    </div>
  );
}
