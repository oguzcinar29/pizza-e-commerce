import mongoose, { Schema } from "mongoose";

const CardsSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    img: String,
  },
  {
    timestamps: true,
  }
);

const Cards = mongoose.models.Cards || mongoose.model("Cards", CardsSchema);

export default Cards;
