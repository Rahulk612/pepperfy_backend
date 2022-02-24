const mongoose = require("mongoose");

const SeettesSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    orgPrice: { type: Number, required: true },
    offer: { type: Number, required: true },
    img1: { type: String, required: true },
    img2: { type: String, required: true },
    img3: { type: String, required: true },
    Brand: { type: String, required: true },
    Dimensions: { type: String, required: true },
    dims: { type: Array, required: true },
    Weight: { type: String, required: true },
    Colour: { type: String, required: true },
    Warranty: { type: String, required: true },
    Assembly: { type: String, required: true },
    Primary_Material: { type: String, required: true },
    Room_Type: { type: String, required: true },
    Seating_Height: { type: String, required: true },
    cashback: { type: Number, required: true },
    shipping: { type: Number, required: true },
    limited: { type: Boolean, required: true },
    rating: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


module.exports = mongoose.model("seettesproducts",SeettesSchema)
