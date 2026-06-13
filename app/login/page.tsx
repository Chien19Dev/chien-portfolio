import { Suspense } from "react";
import { LoginForm } from "./login-form";
import { isGoogleAuthEnabled } from "@/lib/auth";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm googleEnabled={isGoogleAuthEnabled} />
    </Suspense>
  );
}
