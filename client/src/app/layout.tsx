import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";


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
      <body className="bg-gray-100 font-montserrat">
        <Header />
        
        {children}
        </body>
    </html>
  );
}
