"use client";
import { Inter } from "next/font/google";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import PizzaProvider from "@/components/Context/PizzaContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
const open = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={open.className}>
        <SessionProvider>
          <PizzaProvider>
            <div className="max-w-[2500px] m-auto">
              <Navbar />
              {children}
              <Footer />
              <Toaster position="top-center" />
            </div>
          </PizzaProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
