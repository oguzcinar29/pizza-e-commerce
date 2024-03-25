"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useContext, useState } from "react";
import { apiURL } from "../../../../apiURL";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { PizzaContext } from "@/components/Context/PizzaContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");

  const { card, total, setCard, setTotal2, setCardId, cardId } =
    useContext(PizzaContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (!res.ok) {
      setError("Invalid value sorry. Try again");
    } else {
      try {
        const res2 = await fetch(`${apiURL}/api/cards`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ card, total, email }),
        });
        if (!res.ok) {
          throw new Error("Failed to create a card");
        } else {
          const data = await res2.json();
          setCard(data.cardsYeah);
          window.localStorage.setItem(
            "card",
            JSON.stringify(data.cardsYeah) || []
          );
          setTotal2(data.newTotal);
          setCardId(data.cardId);
          window.localStorage.setItem("cardId", JSON.stringify(data.cardId));
        }
      } catch (err) {
        console.log(err);
      }
      router.push("/");
      router.refresh();
    }
  };

  const { isLoggedIn } = useContext(PizzaContext);

  return (
    <div>
      {isLoggedIn && (
        <div className="w-1/3 text-center m-auto rounded-none 1000max:w-full">
          <Alert variant="destructive">
            <AlertDescription className="text-2xl">
              You have to log in first!
            </AlertDescription>
          </Alert>
        </div>
      )}
      <div className="w-3/4 m-auto  mb-32 mt-32 1000max:full text-center 1000max:w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-1/2 m-auto 1000max:w-4/5"
        >
          <h1 className="font-black text-4xl text-orange-500">Login</h1>
          <div className="text-start">
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            ></Input>
          </div>
          <div className="text-start">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>
          {err && <h1>{err}</h1>}
          <span>
            Do you not have an account ?{" "}
            <Link className="underline font-black" href="/register">
              Register
            </Link>
          </span>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
