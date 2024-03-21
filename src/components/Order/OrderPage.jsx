"use client";
import { useContext, useEffect } from "react";
import OrderItems from "./OrderItems";
import { PizzaContext } from "../Context/PizzaContext";
import AdressInfo from "./AdressInfo";

export default function OrderPage() {
  const { card } = useContext(PizzaContext);

  return (
    <div className="w-3/4 mt-10 mb-20 m-auto">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl text-center text-orange-500 font-black">
          Cart
        </h1>
        <div className="flex gap-10 mt-5">
          <div className="w-1/2">
            <OrderItems />
          </div>
          <div className="w-1/2">
            <AdressInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
