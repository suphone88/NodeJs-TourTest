const mongoose = require("mongoose");
const { Schema } = mongoose;

const divisionCatSchema = new Schema({
  //hotel: [{ type: Schema.Types.ObjectId, ref: "hotels" }],

  division: { type: String, required: true, unique: true },
  famousplace: [{ type: Schema.Types.ObjectId, ref: "famousPlace" }],
  body: { type: String, required: true, unique: true },
  created: { type: Date, default: Date.now },
});

const division = mongoose.model("division", divisionCatSchema);
module.exports = division;
