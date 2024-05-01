const express = require("express");
const { schemas } = require("../../models/recipe");
const {
  reloadUser,
  validateBody,
  isValidId,
  upload,
} = require("../../middlewares");
const { recipes: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();
router.get(
  "/myrecipes/",
  reloadUser,

  ctrlWrapper(ctrl.getAllForRecentUser)
);
router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",

  reloadUser,

  upload.single("photo"),
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
