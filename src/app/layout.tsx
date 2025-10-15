"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/profile/Navbar";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { SessionProvider } from "@/lib/auth/session-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Show navbar unless on signup or signin routes
  const showNavbar =
    !pathname.includes("signup") &&
    !pathname.includes("signin") &&
    !pathname.includes("login");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {showNavbar && <Navbar />}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
