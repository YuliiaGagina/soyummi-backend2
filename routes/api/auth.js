const express = require("express");

const { validateBody, reloadUser } = require("../../middlewares");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");

// const ctrlWrapper = require("../../helpers/");

const router = express.Router();

router.post(
  "/register",
  validateBody(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validateBody(joiLoginSchema), ctrlWrapper(ctrl.login));
module.exports = router;

router.get("/logout", reloadUser, ctrlWrapper(ctrl.logout));
