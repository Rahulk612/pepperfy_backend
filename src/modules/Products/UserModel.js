const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const UserRegisterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);



UserRegisterSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 9);
  return next();
});

UserRegisterSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users",UserRegisterSchema)