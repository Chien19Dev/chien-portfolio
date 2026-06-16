import { auth, isGoogleAuthEnabled } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <Suspense>
      <LoginForm googleEnabled={isGoogleAuthEnabled} />
    </Suspense>
  );
}
