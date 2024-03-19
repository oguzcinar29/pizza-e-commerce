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

export function MobileLinks() {
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
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <div className="flex items-center gap-6 flex-col ">
              <span className="relative">
                <ShoppingCart />
                <div className="absolute bg-orange-500 -top-3 text-white -right-3 rounded-full w-6 h-6 text-center ">
                  12
                </div>
              </span>
              <span>Hello, Dawid</span>
              <Button className="rounded-3xl">Logout</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
