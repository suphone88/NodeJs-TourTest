const router = require("express").Router();
const controller = require("../controllers/division");

router.get("/", controller.all);
router.post("/", controller.post);

router
  .route("/:id")
  .get(controller.get)
  .patch(controller.patch)
  .delete(controller.drop);

module.exports = router;
