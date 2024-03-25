"use client";

import { useContext, useState } from "react";
import { PizzaContext } from "../Context/PizzaContext";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { apiURL } from "../../../apiURL";
import { useSession } from "next-auth/react";

export default function OrderSingleItem({
  id,
  img,
  name,
  price,
  incTemp,
  count,
  size,
  isExtraCheese,
  isExtraPepperoni,
}) {
  const { data: session } = useSession();
  const { card, setCard, total, setTotal, cardId } = useContext(PizzaContext);
  const handleClick = async (id) => {
    incTemp();
    const newCard = card.filter((item) => item.id !== id);
    window.localStorage.setItem("card", JSON.stringify(newCard));
    setCard(newCard);
    toast(`${name} removed from the cart`, {
      action: {
        label: "Ok",
        onClick: () => console.log("Ok"),
      },
    });
    if (session?.user) {
      try {
        const itemId = id;
        const res = await fetch(`${apiURL}/api/cards/${cardId}`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ itemId }),
        });
        if (!res.ok) {
          throw new Error("Failed to delete item");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [tempCount, setTempCount] = useState(count);
  const [tempPrice, setTempPrice] = useState(price);

  const handleIncrease = async (id2) => {
    const findIndex = card.findIndex((item) => item.id === id);

    card[findIndex].count += 1;
    setTempCount(tempCount + 1);

    window.localStorage.setItem("card", JSON.stringify(card));
    setCard(card);
    incTemp();
    if (session?.user) {
      try {
        const res = await fetch(`${apiURL}/api/cards/${cardId}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ id2, price, type: "inc" }),
        });
        if (!res.ok) {
          throw new Error("Failed to delete item");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleDecrease = async (id2) => {
    const findIndex = card.findIndex((item) => item.id === id);

    if (card[findIndex].count !== 1) {
      card[findIndex].count -= 1;
      setTempCount(tempCount - 1);
      window.localStorage.setItem("card", JSON.stringify(card));
      setCard(card);
      incTemp();
      if (session?.user) {
        try {
          const res = await fetch(`${apiURL}/api/cards/${cardId}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ id2, price, type: "dec" }),
          });
          if (!res.ok) {
            throw new Error("Failed to delete item");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <div
      key={id}
      className="flex justify-between items-center pr-1 1000max:gap-1"
    >
      <div className="flex gap-3 items-center 1000max:flex-col">
        <img className="w-32 h-32" src={img} />
        <div className="flex flex-col gap-1 ">
          <b>{name}</b>
          {size && (
            <span>
              Size: <span className="font-semibold">{size}</span>
            </span>
          )}
          {isExtraCheese && (
            <span className="text-slate-500">Extra Cheese $1,25</span>
          )}
          {isExtraPepperoni && (
            <span className="text-slate-500">Extra Pepperoni $2,25</span>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Button onClick={() => handleDecrease(id)} variant="outline">
          -
        </Button>
        <span>{tempCount}</span>
        <Button onClick={() => handleIncrease(id)} variant="outline">
          +
        </Button>
      </div>
      <div className="flex gap-2 items-center flex-col">
        <b>${(price * tempCount).toFixed(2)}</b>
        <Button
          onClick={() => handleClick(id)}
          variant="outline"
          className="text-red-500"
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
}
