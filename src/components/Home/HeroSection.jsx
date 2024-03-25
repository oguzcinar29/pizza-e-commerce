import { Button } from "../ui/button";
import { CircleArrowRight } from "lucide-react";
import pizza from "../../../public/pizza-photos/big-pizza-img.png";
import Link from "next/link";
export default function HeroSection() {
  return (
    <div className="w-3/4 m-auto  mb-10 mt-10 1000max:w-4/5">
      <div className="flex gap-40">
        <div className="w-2/5 flex flex-col 1000max:w-full justify-center gap-10">
          <h1 className="text-6xl 1000max:text-4xl font-black">
            Everything is better with a <span>Pizza</span>
          </h1>
          <p className="text-gray-500 ">
            Pizza is the missing piece that makes every day complete, a simple
            yet delicious joy in life
          </p>
          <div className="flex gap-5">
            <Link href="/menu">
              <Button className="w-52 flex gap-3 font-bold items-center rounded-3xl 1000max:w-32 ">
                Order Now{" "}
                <span>
                  <CircleArrowRight />
                </span>
              </Button>
            </Link>
            <Button
              className="w-52 flex gap-3 font-bold items-center rounded-3xl 1000max:w-32 "
              variant="ghost"
            >
              Learn more
              <span>
                <CircleArrowRight />
              </span>
            </Button>
          </div>
        </div>
        <div className="w-3/5 1000max:hidden">
          <img
            className="max-h-full max-w-full"
            src={pizza.src}
            alt="pizza image"
          />
        </div>
      </div>
    </div>
  );
}
