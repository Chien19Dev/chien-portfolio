import { isGoogleAuthEnabled } from "@/lib/auth";
import type { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Đăng ký",
  description:
    "Tạo tài khoản để bình luận, lưu nội dung yêu thích và tương tác với cộng đồng.",
  keywords: [
    "đăng ký",
    "tạo tài khoản",
    "register",
    "signup",
    "authentication",
    "nextjs blog",
  ],
  authors: [{ name: "Nguyễn Đình Chiến" }],
  applicationName: "Portfolio & Blog",
  category: "Technology",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: "/register" },
  openGraph: {
    title: "Đăng ký tài khoản",
    description:
      "Tạo tài khoản để bình luận, lưu nội dung yêu thích và tương tác với cộng đồng.",
    url: "/register",
    siteName: "Portfolio & Blog",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/register.png",
        width: 1200,
        height: 630,
        alt: "Đăng ký tài khoản",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đăng ký tài khoản",
    description:
      "Tạo tài khoản để bình luận, lưu nội dung yêu thích và tương tác với cộng đồng.",
    images: ["/register.png"],
  },
};

export default function RegisterPage() {
  return <RegisterForm googleEnabled={isGoogleAuthEnabled} />;
}
