const mongoose = require("mongoose");
const { Schema } = mongoose;

const HotelSchema = new Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  //famousplace: { type: Schema.Types.ObjectId, ref: "famousPlace" },
  created: { type: Date, default: Date.now },
});

const hotel = mongoose.model("hotel", HotelSchema);
module.exports = hotel;
