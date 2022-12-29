const DB = require("../models/division");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let divisionCats = await DB.find().populate("famousplace");
  Helper.fMsg(res, "All Category", divisionCats);
  //res.json({ msg: "All Category" });
};

const post = async (req, res, next) => {
  let saveDivision = new DB(req.body);
  let result = await saveDivision.save();
  Helper.fMsg(res, "Add Division Name", result);
  //res.json({ msg: "Add Category", result: req.body });
};

const get = async (req, res, next) => {
  let id = req.params.id;
  let division = await DB.findById(id);
  Helper.fMsg(res, "Get single division", division);
  //res.json({ msg: "Single Category", result: req.params.id });
};
const patch = async (req, res, next) => {
  let division = await DB.findById(req.params.id);
  if (division) {
    await DB.findByIdAndUpdate(division._id, req.body);
    let resultDivision = await DB.findById(division._id);
    Helper.fMsg(res, "Updated Division", resultDivision);
  } else {
    next(new Error("Error,No Division Id"));
  }
  //res.json({ msg: "Patch Category", result: req.params.id });
};
const drop = async (req, res, next) => {
  await DB.findByIdAndDelete(req.params.id);
  Helper.fMsg(res, "Deleted place");
  //res.json({ msg: "Deleted Category", result: req.params.id });
};

module.exports = {
  all,
  post,
  get,
  patch,
  drop,
};
