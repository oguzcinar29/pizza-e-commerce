import { connectMongoDB } from "@/lib/mongodb";
import Cards from "@/models/cards";
import { NextResponse } from "next/server";
export async function POST(request, { params }) {
  const { id } = params;
  console.log(id);
  const data = await request.json();
  console.log(data);
  try {
    await connectMongoDB();
    const cards = await Cards.findById(id);
    console.log(cards);
    const newArr = cards.cardItems.filter((item) => item.id !== data);
    console.log(newArr);
    await Cards.findByIdAndUpdate(id, { cardItems: newArr });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  console.log(id);
  const { id2, price } = await request.json();
  console.log(price);
  try {
    await connectMongoDB();
    const findCard = await Cards.findById(id);
    const findItem = findCard.cardItems.findIndex((item) => item.id === id2);
    console.log(findItem);
    findCard.cardItems[findItem].count += 1;
    findCard.total += price;
    const arr = findCard.cardItems;
    const newTotal = findCard.total;
    await Cards.findByIdAndUpdate(id, { cardItems: arr, total: newTotal });
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}
