"use client";
import { data, desertData, pastaData } from "@/FakePizzaData";
import React from "react";
import SinglePizzaItem from "./SinglePizzaItem";

export default function MenuPage() {
  return (
    <div className="w-3/4 m-auto 1000max:4/5s mt-20 mb-20">
      <div className="flex flex-col gap-10">
        <div className="text-center">
          <h1 className="text-5xl text-orange-500 font-black">Pizza</h1>
          <div className="flex flex-wrap  gap-5 mt-10 1000max:flex-col 1000max:justify-center 1000max:items-center ">
            {data.map((item) => {
              if (item.type === "pizza") {
                return <SinglePizzaItem {...item} key={item.id} />;
              }
            })}
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-5xl text-orange-500 font-black">Pasta</h1>
          <div className="flex flex-wrap gap-5 mt-10 1000max:flex-col 1000max:justify-center 1000max:items-center ">
            {data.map((item) => {
              if (item.type === "pasta") {
                return <SinglePizzaItem {...item} key={item.id} />;
              }
            })}
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-5xl text-orange-500 font-black">Dessert</h1>
          <div className="flex flex-wrap gap-5 mt-10 1000max:flex-col 1000max:justify-center 1000max:items-center ">
            {data.map((item) => {
              if (item.type === "dessert") {
                return <SinglePizzaItem {...item} key={item.id} />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
