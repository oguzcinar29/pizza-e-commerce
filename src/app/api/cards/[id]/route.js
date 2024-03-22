import { connectMongoDB } from "@/lib/mongodb";
import Cards from "@/models/cards";
import { NextResponse } from "next/server";
export async function POST(request, { params }) {
  const { id } = params;
  console.log(id);
  const { itemId } = await request.json();
  console.log(itemId);
  try {
    await connectMongoDB();
    const cards = await Cards.findById(id);
    console.log(cards);
    const newArr = cards.cardItems.filter((item) => item.id !== itemId);
    console.log(newArr);
    let total = 0;
    newArr.forEach((item) => {
      console.log(item.price);
      console.log(item.count);
      total += item.price * item.count;
    });
    console.log(total);
    await Cards.findByIdAndUpdate(id, { cardItems: newArr, total: total });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  console.log(id);
  const {
    id2,
    price,
    type,
    name,
    img,
    size,
    description,
    isExtraCheese,
    findIndex,
    isExtraPepperoni,
    pizzaSize,
    te,
    extraCheese,
  } = await request.json();
  console.log(price);
  console.log(type);
  console.log("findindex" + findIndex);
  try {
    await connectMongoDB();
    const findCard = await Cards.findById(id);

    console.log("hey");
    if (type === "new") {
      const arr32 = findCard.cardItems;
      console.log(arr32);
      const newItem = {
        id: arr32.length + 1,
        price: extraCheese + pizzaSize,
        img,
        name,
        size: size,
        description,
        count: 1,
        isExtraCheese,
        isExtraPepperoni,
      };
      arr32.push(newItem);
      const newPrice = newItem.price;
      console.log(newPrice);
      await Cards.findByIdAndUpdate(id, {
        cardItems: arr32,
        total: findCard.total + newPrice,
      });
      return NextResponse.json({ message: "success" }, { status: 200 });
    }
    if (te === "12") {
      const card = await Cards.findById(id);
      console.log(card.cardItems);
      const findIndex = card?.cardItems?.findIndex(
        (item) =>
          item.size === size &&
          item.price === pizzaSize + extraCheese &&
          item.isExtraCheese === isExtraCheese &&
          item.isExtraPepperoni === isExtraPepperoni
      );
      console.log(findIndex);
      if (type === "inc") {
        findCard.cardItems[findIndex].count += 1;
        findCard.total += price;
      }
      if (type === "dec") {
        findCard.cardItems[findIndex].count -= 1;
        findCard.total -= price;
      }
      const arr = findCard.cardItems;
      const newTotal = findCard.total;
      await Cards.findByIdAndUpdate(id, { cardItems: arr, total: newTotal });
      return NextResponse.json({ message: "success" }, { status: 200 });
    }
    const findItem = findCard.cardItems.findIndex((item) => item.id === id2);
    console.log("hey2");
    console.log(id2);
    console.log(findItem);
    if (type === "inc") {
      findCard.cardItems[findItem].count += 1;
      findCard.total += price;
    }
    if (type === "dec") {
      findCard.cardItems[findItem].count -= 1;
      findCard.total -= price;
    }
    const arr = findCard.cardItems;
    const newTotal = findCard.total;
    await Cards.findByIdAndUpdate(id, { cardItems: arr, total: newTotal });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
