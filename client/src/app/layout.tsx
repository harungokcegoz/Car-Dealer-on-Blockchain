import type { Metadata } from "next";
import { NTR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const ntr = NTR({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Auto Trading",
  description: "Buy and sell cars online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ntr.className} bg-gray-100`}>
        <Header />
        
        {children}
        </body>
    </html>
  );
}
