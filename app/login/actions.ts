"use server"

import { signIn } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function signInWithCredentials(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  })

  if (result?.error) {
    return { error: "Invalid credentials" }
  }

  redirect("/")
}
