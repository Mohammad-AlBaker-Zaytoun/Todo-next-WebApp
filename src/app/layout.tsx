import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "To Do App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-800 text-slate-100 container text-slate-100 mx-auto p-4`}
      >
        {children}
      </body>
    </html>
  );
}
