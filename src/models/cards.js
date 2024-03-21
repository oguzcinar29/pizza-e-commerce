import mongoose, { Schema } from "mongoose";

const CardsSchema = new Schema(
  {
    cardItems: Array,
    total: Number,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const Cards = mongoose.models.Cards || mongoose.model("Cards", CardsSchema);

export default Cards;
