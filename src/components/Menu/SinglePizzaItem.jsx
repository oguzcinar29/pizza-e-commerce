"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { PizzaContext } from "../Context/PizzaContext";

export default function SinglePizzaItem({ id, price, img, name, description }) {
  return (
    <div className="border mb-7 border-slate-500 p-3 w-[32%] rounded-sm flex flex-col gap-5 min-w-72">
      <div className="bg-transparent text-center flex justify-center items-center">
        <img
          src={img}
          className="bg-gray-300 text-center flex justify-center items-center"
        />
      </div>
      <h2 className="font-black text-xl">{name}</h2>
      <p className="text-slate-500">{description}</p>
      <Button>Add to cart(from ${price})</Button>
    </div>
  );
}
