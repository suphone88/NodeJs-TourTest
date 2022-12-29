const mongoose = require("mongoose");
const { Schema } = mongoose;

const famousPlaceSchema = new Schema({
  division: { type: Schema.Types.ObjectId, ref: "division" },

  name: { type: String, required: true, unique: true },
  about: { type: String, required: true, unique: true },
  transportation: { type: String, required: true },
  hotels: [{ type: Schema.Types.ObjectId, ref: "hotel" }],
  created: { type: Date, default: Date.now },
});

const famousplace = mongoose.model("famousPlace", famousPlaceSchema);
module.exports = famousplace;
