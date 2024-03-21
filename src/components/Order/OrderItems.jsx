"use client";

import { useContext, useEffect, useState } from "react";
import { PizzaContext } from "../Context/PizzaContext";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import OrderSingleItem from "./OrderSingleItem";
export default function OrderItems() {
  const { card, setTotal2, total } = useContext(PizzaContext);

  const getTotal = () => {
    let total = 0;

    card.forEach((item) => {
      total += item.price * item.count;
    });
    setTotal2(total);
  };

  return (
    <div>
      <div className="sticky overflow-y-scroll h-96">
        {card.map((item) => {
          return <OrderSingleItem incTemp={getTotal} {...item} key={item.id} />;
        })}
      </div>
      <div className="flex flex-col gap-2 text-right text-xl mr-5 mt-3">
        <span>
          Subtotal: <b>${total?.toFixed(2)}</b>
        </span>
        <span>
          Delivery: <b>$5</b>
        </span>
        <span>
          Total: <b>${total !== 0 ? (total + 5).toFixed(2) : 0}</b>
        </span>
      </div>
    </div>
  );
}
