import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { MobileLinks } from "./MobileLinks";
export default function Navbar() {
  return (
    <nav className="w-3/4 m-auto pt-7 pb-7">
      <div className="flex justify-between">
        <div className="flex gap-10 items-center">
          <h1 className="text-orange-500 text-3xl font-extrabold">ST PIZZA</h1>
          <div className="flex gap-10 items-center 1000max:hidden">
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="flex items-center gap-6 1000max:hidden">
          <span>Hello, Dawid</span>
          <Button className="rounded-3xl">Logout</Button>
          <Link href="/order" className="relative">
            <ShoppingCart />
            <div className="absolute bg-orange-500 -top-3 text-white -right-3 rounded-full w-6 h-6 text-center ">
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
