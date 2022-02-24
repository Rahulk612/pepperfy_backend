const mongoose = require("mongoose")

module.exports = () => {
    return mongoose.connect(
      "mongodb+srv://riyazuddinshaik:58795879@cluster0.62qkq.mongodb.net/Pepperfry"
    );
}