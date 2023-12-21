const express = require("express");

const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { reloadUser, upload } = require("../../middlewares");

router.get("/current", reloadUser, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/avatars",
  reloadUser,
  upload.single("avatarURL"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
