"use client";
import { createContext, useState } from "react";

export const PizzaContext = createContext("");

function PizzaProvider({ children }) {
  const [card, setCard] = useState([]);

  const values = { card, setCard };

  return (
    <div>
      <PizzaContext.Provider value={values}>{children}</PizzaContext.Provider>
    </div>
  );
}

export default PizzaProvider;
