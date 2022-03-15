const mongoose = require("mongoose")

const SingleSchema = new mongoose.Schema({
    item:{type:Object,required:true}
},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("trending",SingleSchema)