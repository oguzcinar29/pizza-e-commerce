"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { MobileLinks } from "./MobileLinks";
import { signOut, useSession } from "next-auth/react";
export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="w-3/4 m-auto pt-7 pb-7 1000max:w-4/5">
      <div className="flex justify-between">
        <div className="flex gap-10 items-center">
          <Link href="/" className="text-orange-500 text-3xl font-extrabold">
            ST PIZZA
          </Link>
          <div className="flex gap-10 items-center 1000max:hidden">
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="flex items-center gap-6 1000max:hidden">
          {!session?.user && (
            <Link href="/login">
              <Button className="rounded-3xl text-lg">Login</Button>
            </Link>
          )}
          {session?.user && (
            <div className="flex gap-6 items-center text-lg">
              <Link href="/profile">Hello, Dawid</Link>
              <Button onClick={() => signOut()} className="rounded-3xl text-lg">
                Logout
              </Button>
            </div>
          )}
          <Link href="/order" className="relative">
            <ShoppingCart />
            <div className="absolute bg-orange-500 -top-4 text-white -right-4 rounded-full w-6 h-6 text-center ">
              12
            </div>
          </Link>
        </div>

        <div className="1000min:hidden">
          <MobileLinks />
        </div>
      </div>
    </nav>
  );
}
