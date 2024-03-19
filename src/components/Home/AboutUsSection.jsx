import React from "react";
import pizzaStore from "../../../public/pizza-photos/pizza-store.jpg";
export default function AboutUsSection() {
  return (
    <div className="w-3/4 m-auto mb-32 1000max:w-3/4 ">
      <div className="flex gap-20">
        <div className="flex flex-col gap-3 w-1/2 1000max:w-full">
          <h3 className="text-xl text-slate-500">OUR STORY</h3>
          <h1 className="text-4xl text-orange-500 font-black">About Us</h1>
          <p className=" text-slate-500 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="w-1/2 1000max:hidden">
          <img src={pizzaStore.src} />
        </div>
      </div>
    </div>
  );
}
