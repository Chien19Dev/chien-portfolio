"use server";

import { signIn } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInWithCredentials(
  _prevState: { error?: string } | null,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const callbackUrl = (formData.get("callbackUrl") as string) || "/";

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Email hoặc mật khẩu không đúng" };
    }
    revalidatePath("/");
    redirect(callbackUrl);
  } catch (err: unknown) {
    if (err instanceof Error && err.message?.includes("NEXT_REDIRECT")) {
      throw err;
    }
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }
}
