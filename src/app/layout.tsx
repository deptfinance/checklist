import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PT Hongyi Asset Manajemen",
  description:
    "Company profile PT Hongyi Asset Manajemen untuk layanan pengelolaan aset, investasi, dan pembiayaan produktif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
