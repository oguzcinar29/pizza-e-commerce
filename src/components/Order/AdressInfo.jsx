"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useContext, useEffect, useState } from "react";
import { PizzaContext } from "../Context/PizzaContext";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AdressInfo() {
  const { card, total, isLoggedIn, setLoggedIn } = useContext(PizzaContext);

  const { data: session } = useSession();

  return (
    <div>
      <div className="flex flex-col gap-3 bg-gray-100 p-5 rounded-lg">
        <b>Checkout</b>
        <div>
          <Label>Phone</Label>
          <Input />
        </div>
        <div>
          <Label>Street Address</Label>
          <Input />
        </div>
        <div className="flex gap-3 ">
          <div className="w-1/2 ">
            <Label>Postal Code</Label>
            <Input />
          </div>
          <div className="w-1/2 ">
            <Label>City</Label>
            <Input />
          </div>
        </div>
        <div>
          <Label>Country</Label>
          <Input />
        </div>
        {!session?.user && (
          <Link onClick={() => setLoggedIn(true)} href="/login">
            <Button className="text-xl w-full">
              Pay ${(total + 5).toFixed(2)}
            </Button>
          </Link>
        )}
        {session?.user && (
          <Button className="text-xl w-full">
            Pay ${(total + 5).toFixed(2)}
          </Button>
        )}
      </div>
    </div>
  );
}
