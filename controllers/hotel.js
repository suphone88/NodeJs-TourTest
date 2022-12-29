const DB = require("../models/hotel");
const famousplaceDb = require("../models/famousPlace");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let hotels = await DB.find();
  Helper.fMsg(res, "All Hotels", hotels);
};

// const add = async (req, res, next) => {
//   let result = await new DB(req.body).save();
//   Helper.fMsg(res, "Add Hotel", result);
// };

const add = async (req, res, next) => {
  let hotels = new DB(req.body);
  let result = await hotels.save();
  await famousplaceDb.findByIdAndUpdate(req.body.famousplace, {
    $push: { hotels: result._id },
  });
  Helper.fMsg(res, "Add Hotel", result);
  //res.send({ con: true, msg: "Role childCategory ", result });
};

const get = async (req, res, next) => {
  let id = req.params.id;
  let hotel = await DB.findById(id);
  Helper.fMsg(res, "Get single hotel", hotel);
};
const patch = async (req, res, next) => {
  let hotel = await DB.findById(req.params.id);
  if (hotel) {
    await DB.findByIdAndUpdate(hotel._id, req.body);
    let resulthotel = await DB.findById(hotel._id);
    Helper.fMsg(res, "Updated Hote", resulthotel);
  } else {
    next(new Error("Error, Not found"));
  }
};

const drop = async (req, res, next) => {
  await DB.findByIdAndDelete(req.params.id);
  Helper.fMsg(res, "Deleted");
};

module.exports = {
  all,
  add,
  get,
  patch,
  drop,
};
