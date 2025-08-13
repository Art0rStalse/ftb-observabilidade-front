"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/Navbar/navbar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {SessionProvider} from "next-auth/react";

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
    const queryClient = new QueryClient();

  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
            <SessionProvider>
                <Navbar />
            </SessionProvider>
        </header>
        <main>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </main>
        <footer></footer>
      </body>
    </html>
  );
}
