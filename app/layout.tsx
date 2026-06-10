import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chien19.vercel.app"),

  title: {
    default: "Nguyễn Đình Chiến | Frontend Developer",
    template: "%s | Nguyễn Đình Chiến",
  },

  description:
    "Frontend Developer chuyên React, Next.js, TypeScript và Material UI. Portfolio cá nhân giới thiệu dự án, kỹ năng và kinh nghiệm phát triển web hiện đại.",

  keywords: [
    "Nguyễn Đình Chiến",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Material UI",
    "Portfolio",
    "Web Developer",
    "Fullstack Developer",
  ],

  authors: [
    {
      name: "Nguyễn Đình Chiến",
    },
  ],

  creator: "Nguyễn Đình Chiến",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://chien19.vercel.app",
    siteName: "Nguyễn Đình Chiến Portfolio",
    title: "Nguyễn Đình Chiến | Frontend Developer",
    description:
      "Portfolio cá nhân giới thiệu dự án, kỹ năng và kinh nghiệm phát triển web với React, Next.js và TypeScript.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Nguyễn Đình Chiến Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nguyễn Đình Chiến | Frontend Developer",
    description:
      "Portfolio cá nhân giới thiệu dự án, kỹ năng và kinh nghiệm phát triển web.",
    images: ["/banner.png"],
  },

  alternates: {
    canonical: "https://chien19.vercel.app",
  },

  category: "technology",
};
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import Providers from "./providers";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppRouterCacheProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
