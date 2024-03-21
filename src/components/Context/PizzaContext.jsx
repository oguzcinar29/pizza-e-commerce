"use client";
import { createContext, useEffect, useState } from "react";

export const PizzaContext = createContext("");

function PizzaProvider({ children }) {
  const [card, setCard] = useState([]);

  useEffect(() => {
    setCard(JSON.parse(window.localStorage.getItem("card") || "[]"));
  }, []);

  const getTotal2 = () => {
    let total = 0;
    card !== null &&
      card?.forEach((item) => {
        total += item.price * item.count;
      });

    return total;
  };

  const [total, setTotal2] = useState(() => getTotal2());

  useEffect(() => {
    setTotal2(getTotal2());
  }, [card]);

  const [isLoggedIn, setLoggedIn] = useState(false);

  const [cardId, setCardId] = useState("");
  useEffect(() => {
    setCardId(JSON.parse(window.localStorage.getItem("cardId")) || "");
  }, [cardId]);
  const values = {
    card,
    setCard,
    cardId,
    setCardId,
    total,
    setTotal2,
    isLoggedIn,
    setLoggedIn,
    cardId,
  };

  return (
    <div>
      <PizzaContext.Provider value={values}>{children}</PizzaContext.Provider>
    </div>
  );
}

export default PizzaProvider;
