"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { apiURL } from "../../../../apiURL";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiURL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message);
      } else {
        console.log("success log");
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-3/4 m-auto  mb-44 mt-32  text-center 1000max:w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-1/2 m-auto 1000max:w-4/5"
      >
        <h1 className="font-black text-4xl text-orange-500">Register</h1>
        <div className="text-start">
          <Label>Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          ></Input>
        </div>
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
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
