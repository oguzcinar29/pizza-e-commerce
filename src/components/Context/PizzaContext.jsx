"use client";
import { createContext, useEffect, useState } from "react";

export const PizzaContext = createContext("");

function PizzaProvider({ children }) {
  const [card, setCard] = useState([]);

  useEffect(() => {
    setCard(JSON.parse(window.localStorage.getItem("card") || "[]"));
  }, []);

  const values = { card, setCard };

  return (
    <div>
      <PizzaContext.Provider value={values}>{children}</PizzaContext.Provider>
    </div>
  );
}

export default PizzaProvider;
