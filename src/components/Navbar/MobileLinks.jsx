"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function MobileLinks() {
  const { data: session } = useSession();
    const {card,setCard}=useContext(PizzaContext)
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-transparent">
            <Menu className="text-black" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col gap-10 items-center pt-10 justify-center">
            <SheetClose asChild>
              <Link href="/">Home</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/menu">Menu</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/about">About</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/contact">Contact</Link>
            </SheetClose>

            <div className="flex items-center gap-6 flex-col ">
              <SheetClose asChild>
                <Link href="/order" className="relative">
                  <ShoppingCart />
                  <div className="absolute bg-orange-500 -top-3 text-white -right-3 rounded-full w-6 h-6 text-center ">
                    12
                  </div>
                </Link>
              </SheetClose>

              {!session?.user && (
                <SheetClose asChild>
                  <Link href="/login">
                    <Button className="rounded-3xl text-lg">Login</Button>
                  </Link>
                </SheetClose>
              )}
              {session?.user && (
                <div className="flex gap-6 items-center flex-col text-lg">
                  <Link href="/profile">Hello, Dawid</Link>
                  <Button
                    onClick={() => signOut()}
                    className="rounded-3xl text-lg"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
