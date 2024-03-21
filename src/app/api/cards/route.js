import { connectMongoDB } from "@/lib/mongodb";
import Cards from "@/models/cards";
import Users from "@/models/users";
import { NextResponse } from "next/server";
export async function POST(request) {
  const { card, total, email } = await request.json();

  try {
    await connectMongoDB();
    const users = await Users.find();
    const findUser = users.find((item) => item.email === email);
    const userId = findUser._id.toString();
    const allCards = await Cards.find();
    const findCard = allCards.find(
      (item) => findUser._id.toString() === item.userId.toString()
    );

    if (!findCard) {
      const cardsYeah2 = await Cards.create({ cardItems: card, total, userId });

      const cardsYeah = cardsYeah2.cardItems;
      const newTotal = total + cardsYeah.total;
      const cardId = cardsYeah2._id.toString();
      return NextResponse.json(
        { cardsYeah, total: newTotal, cardId },
        { status: 200 }
      );
    } else {
      let newId = 1;
      const newArr = findCard.cardItems.map((item) => {
        const newItem = {
          id: newId,
          price: item.price,
          img: item.img,
          name: item.name,
          description: item.description,
          size: item.size,
          count: item.count,
          isExtraCheese: item.isExtraCheese,
          isExtraPepperoni: item.isExtraPepperoni,
        };
        newId += 1;
        return newItem;
      });

      card.forEach((item) => {
        const newItem = {
          id: newId,
          price: item.price,
          img: item.img,
          name: item.name,
          description: item.description,
          size: item.size,
          count: item.count,
          isExtraCheese: item.isExtraCheese,
          isExtraPepperoni: item.isExtraPepperoni,
        };
        newId += 1;
        findCard.cardItems.push(newItem);
      });

      console.log(findCard);

      const card2 = await Cards.findByIdAndUpdate(findCard._id.toString(), {
        cardItems: findCard.cardItems,
        total: total + findCard.total,
      });
      const cardsYeah = findCard?.cardItems;
      const newTotal = total + findCard.total;
      const cardId = findCard._id.toString();
      return NextResponse.json(
        { cardsYeah, newTotal, cardId },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
