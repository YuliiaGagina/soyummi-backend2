const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Неправильний формат електронної пошти"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isActivated: {
      type: String,
      default: false,
    },
    activationLink: {
      type: String,
    },

    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// token: {
//   type: String,
//   default: null,
// },

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(/^\S+@\S+\.\S+$/)
    .required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .pattern(/^\S+@\S+\.\S+$/)
    .required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
