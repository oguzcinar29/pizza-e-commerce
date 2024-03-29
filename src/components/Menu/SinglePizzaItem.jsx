"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PizzaContext } from "../Context/PizzaContext";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { apiURL } from "../../../apiURL";
export default function SinglePizzaItem({
  id,
  price,
  img,
  type,
  name,
  description,
}) {
  const { card, setCard, setTotal2, cardId } = useContext(PizzaContext);
  const [size, setSize] = useState("Small");
  const { data: session } = useSession();

  const handleClick = async () => {
    toast(`${name} added to cart`, {
      action: {
        label: "Ok",
        onClick: () => console.log("Ok"),
      },
    });
    const findItem = card?.find(
      (item) =>
        item.size === size &&
        item.price === pizzaSize + extraCheese &&
        item.isExtraCheese === isExtraCheese &&
        item.isExtraPepperoni === isExtraPepperoni
    );

    if (!findItem) {
      if (session?.user) {
        try {
          const res = await fetch(`${apiURL}/api/cards/${cardId}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              price,
              type: "new",
              img,
              name,
              size,
              description,
              count: 1,
              isExtraCheese,
              isExtraPepperoni,
              pizzaSize,
              extraCheese,
            }),
          });
          if (!res.ok) {
            throw new Error("Failed to delete item");
          }
        } catch (err) {
          console.log(err);
        }
      }
      setCard((prevVal) => {
        return [
          ...prevVal,
          {
            id: card[card.length - 1]?.id ? card[card.length - 1]?.id + 1 : 1,
            price: pizzaSize + extraCheese,
            img,
            name,
            description,
            size: size,
            count: 1,
            isExtraCheese,
            isExtraPepperoni,
          },
        ];
      });
      window.localStorage.setItem(
        "card",
        JSON.stringify([
          ...card,
          {
            id: card[card.length - 1]?.id ? card[card.length - 1]?.id + 1 : 1,
            price: pizzaSize + extraCheese,
            img,
            name,
            size: size,
            description,
            count: 1,
            isExtraCheese,
            isExtraPepperoni,
          },
        ])
      );

      console.log("hey");
    } else {
      const findIndex = card?.findIndex(
        (item) =>
          item.size === size &&
          item.price === pizzaSize + extraCheese &&
          item.isExtraCheese === isExtraCheese &&
          item.isExtraPepperoni === isExtraPepperoni
      );

      if (session?.user) {
        console.log("h3231");
        try {
          const id2 = findIndex;
          const price = pizzaSize + extraCheese;
          const res = await fetch(`${apiURL}/api/cards/${cardId}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              id2,
              price,
              type: "inc",
              te: "12",
              size,
              price,
              pizzaSize,
              extraCheese,
              isExtraCheese,
              isExtraPepperoni,
            }),
          });
          if (!res.ok) {
            throw new Error("Failed to delete item");
          }
        } catch (err) {
          console.log(err);
        }
      }

      card[findIndex].count += 1;
      setCard(card);
      window.localStorage.setItem("card", JSON.stringify(card));
    }
    setOpen(false);
    setTotal2((prevVal) => (prevVal += pizzaSize + extraCheese));
  };

  const [extraCheese, setExtraCheese] = useState(0);

  const [pizzaSize, setPizzaSize] = useState(price);

  const [open, setOpen] = useState(false);

  const [isExtraCheese, setIsExtraCheese] = useState(false);
  const [isExtraPepperoni, setIsExtraPepperoni] = useState(false);

  useEffect(() => {
    if (open === false) {
      setExtraCheese(0);
      setPizzaSize(price);
      setIsExtraCheese(false);
      setIsExtraPepperoni(false);
      setSize("");
    }
  }, [open]);

  return (
    <div className="border mb-7 border-slate-500 p-3 w-[32%] rounded-sm flex flex-col gap-5 min-w-72">
      <div className="bg-transparent text-center flex justify-center items-center">
        <img
          src={img}
          className="bg-gray-300 text-center flex justify-center w-52 h-52 items-center"
        />
      </div>
      <h2 className="font-black text-xl">{name}</h2>
      <p className="text-slate-500">{description.slice(0, 200)}...</p>
      {type !== "pizza" && (
        <Button type="button" onClick={handleClick}>
          Add to cart ${price}
        </Button>
      )}
      {type === "pizza" && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add to cart ${price.toFixed(2)}</Button>
          </DialogTrigger>
          <DialogContent className="fixed overflow-y-scroll mb-32 h-[calc(100vh-20vh)] ">
            <DialogHeader className="flex flex-col justify-center items-center">
              <div>
                <img src={img} />
              </div>
              <DialogTitle>{name}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-10 mt-5">
              <div className="flex flex-col gap-3">
                <h1 className="text-center text-lg font-semibold">
                  Pick your size
                </h1>
                <RadioGroup
                  onValueChange={(e) => {
                    if (e === "small") {
                      setPizzaSize(price);
                      setSize("Small");
                    }
                    if (e === "medium") {
                      setPizzaSize(price + 2);
                      setSize("Medium");
                    }
                    if (e === "large") {
                      setPizzaSize(price + 4);
                      setSize("Large");
                    }
                  }}
                  defaultValue="small"
                  className="flex flex-col gap-5"
                >
                  <div className="flex items-center space-x-2 border border-slate-200 p-5 rounded-lg">
                    <RadioGroupItem value="small" id="r1" />
                    <Label htmlFor="r1">Small ${price}</Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-slate-200 p-5 rounded-lg">
                    <RadioGroupItem value="medium" id="r2" />
                    <Label htmlFor="r2">Medium ${price + 2}</Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-slate-200 p-5 rounded-lg">
                    <RadioGroupItem value="large" id="r3" />
                    <Label htmlFor="r3">Large ${price + 4}</Label>
                  </div>
                </RadioGroup>
              </div>
              {type === "pizza" && (
                <div className="flex flex-col gap-5">
                  <h1 className="text-center text-lg font-semibold">
                    Any extras ?
                  </h1>
                  <div className="flex items-center space-x-2 border border-slate-200 p-5 rounded-lg">
                    <Checkbox
                      onCheckedChange={(e) => {
                        if (e) {
                          setExtraCheese((prevVal) => prevVal + 1.25);
                          setIsExtraCheese(true);
                        } else {
                          setExtraCheese((prevVal) => prevVal - 1.25);
                          setIsExtraCheese(false);
                        }
                      }}
                      className="rounded-none"
                      id="terms"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Extra cheese +$1,25
                    </label>
                  </div>
                  <div className="items-top flex space-x-2 border border-slate-200 p-5 rounded-lg">
                    <Checkbox
                      onCheckedChange={(e) => {
                        if (e) {
                          setExtraCheese((prevVal) => prevVal + 2.25);
                          setIsExtraPepperoni(true);
                        } else {
                          setExtraCheese((prevVal) => prevVal - 2.25);
                          setIsExtraPepperoni(false);
                        }
                      }}
                      className="rounded-none"
                      id="terms2"
                    />
                    <label
                      htmlFor="terms2"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Extra pepperoni +$2,25
                    </label>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleClick}>
                Add to cart ${(pizzaSize + extraCheese).toFixed(2)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
