"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { apiURL } from "../../../../apiURL";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
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
      router.push("/");
    }
  };

  return (
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
  );
}
