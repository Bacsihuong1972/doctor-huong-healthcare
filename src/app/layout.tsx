import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Doctor Hương Healthcare",
    default: "Ổn định đường huyết mỗi ngày – Cùng Bác sĩ Hương",
  },
  description:
    "Khóa học giáo dục sức khỏe tiếng Việt dành cho người mắc tiểu đường type 2, tiền tiểu đường và người cao tuổi. Học cách ăn uống và vận động an toàn để ổn định đường huyết.",
  keywords: [
    "tiểu đường type 2",
    "đường huyết",
    "glucose",
    "ăn uống tiểu đường",
    "kiểm soát đường huyết",
    "giáo dục sức khỏe",
    "Doctor Hương",
  ],
  authors: [{ name: "Doctor Hương Healthcare" }],
  creator: "Doctor Hương Healthcare",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Ổn định đường huyết mỗi ngày – Cùng Bác sĩ Hương",
    description:
      "Khóa học giáo dục sức khỏe dành cho người mắc tiểu đường tại Việt Nam",
    siteName: "Doctor Hương Healthcare",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-background text-text antialiased">
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
