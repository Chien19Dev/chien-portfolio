import { auth, isGoogleAuthEnabled } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "./login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description:
    "Đăng nhập để truy cập tài khoản và quản lý nội dung trên website.",

  keywords: ["đăng nhập", "login", "tài khoản", "authentication", "nextjs"],

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  openGraph: {
    title: "Đăng nhập",
    description:
      "Đăng nhập để truy cập tài khoản và quản lý nội dung trên website.",
    type: "website",
    locale: "vi_VN",
    url: "https://chien19.vercel.app/login",
    siteName: "Tên Website",
    images: [
      {
        url: "/login.png",
        width: 1200,
        height: 630,
        alt: "Đăng nhập",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Đăng nhập",
    description:
      "Đăng nhập để truy cập tài khoản và quản lý nội dung trên website.",
    images: ["/login.png"],
  },

  alternates: {
    canonical: "https://chien19.vercel.app/login",
  },
};

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
