const DB = require("../models/famousPlace");
const divisionDB = require("../models/division");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let place = await DB.find().populate("hotels");
  Helper.fMsg(res, "All famous place", place);
  //res.json({ msg: "All famous place" });
};
const add = async (req, res, next) => {
  let savePlace = new DB(req.body);
  let result = await savePlace.save();
  let division = await divisionDB.findByIdAndUpdate(req.body.division, {
    $push: { famousPlace: result._id },
  });
  Helper.fMsg(res, "Add famous place", result);
  //res.json({ msg: "Add famous place", result: req.body });
};

const get = async (req, res, next) => {
  let id = req.params.id;
  let place = await DB.findById(id);
  Helper.fMsg(res, "Get single famous place", place);
  //res.json({ msg: "Get single famous place", result: req.params.id });
};
const patch = async (req, res, next) => {
  let place = await DB.findById(req.params.id);
  if (place) {
    await DB.findByIdAndUpdate(place._id, req.body);
    let retplace = await DB.findById(place._id);
    Helper.fMsg(res, "Updated famous place", retplace);
  } else {
    next(new Error("Error,No Famous Place Id"));
    //res.json({ msg: "Error,No famous place Id" });
  }
  //res.json({ msg: "Updated famous place", result: req.params.id });
};
const drop = async (req, res, next) => {
  let result = await DB.findByIdAndDelete(req.params.id);
  Helper.fMsg(res, "Deleted place", result);
  //res.json({ msg: "Deleted famous place", result: req.params.id });
};

module.exports = {
  all,
  add,
  get,
  patch,
  drop,
};
