import React from "react";
import { data } from "@/FakePizzaData";
import { Button } from "../ui/button";

export default function BestSellerSection() {
  return (
    <div className="w-3/4 m-auto mt-16 mb-32 1000max:w-4/5">
      <div className="text-center">
        <h3 className="text-xl text-slate-500">CHECK OUT</h3>
        <h1 className="text-4xl text-orange-500 font-black">
          Our Best Sellers
        </h1>
        <div className="flex justify-between mt-10 1000max:flex-col 1000max:justify-center 1000max:items-center gap-7">
          <div className="border border-slate-500 p-3 w-1/3 rounded-sm flex flex-col gap-5 min-w-72">
            <div className="bg-transparent text-center flex justify-center items-center">
              <img
                src={data[0].img}
                className="bg-gray-300 text-center flex justify-center items-center"
              />
            </div>
            <h2 className="font-black text-xl">{data[0].name}</h2>
            <p className="text-slate-500">{data[0].description}</p>
            <Button>Add to cart(from $12)</Button>
          </div>
          <div className="border border-slate-500  p-3 w-1/3 rounded-sm flex flex-col gap-5 min-w-72">
            <div className="bg-transparent text-center flex justify-center items-center">
              <img
                src={data[0].img}
                className="bg-gray-300 text-center flex justify-center items-center"
              />
            </div>
            <h2 className="font-black text-xl">{data[0].name}</h2>
            <p className="text-slate-500">{data[0].description}</p>
            <Button>Add to cart(from $12)</Button>
          </div>
          <div className="border border-slate-500 p-3 w-1/3 rounded-sm flex flex-col gap-5 min-w-72">
            <div className="bg-transparent text-center flex justify-center items-center">
              <img
                src={data[0].img}
                className="bg-gray-300 text-center flex justify-center items-center"
              />
            </div>
            <h2 className="font-black text-xl">{data[0].name}</h2>
            <p className="text-slate-500">{data[0].description}</p>
            <Button>Add to cart(from $12)</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
