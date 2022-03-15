const mongoose  = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [{type: Object, required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


module.exports = mongoose.model("cartItems",cartSchema)