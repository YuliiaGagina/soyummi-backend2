const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email not found");
  }
  const passwordCompare = bcrypt.compareSync(password, user.password);
  if (!passwordCompare) {
    throw new Unauthorized("password wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "22h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    data: {
      token,
      name: user.name,
      email,
    },
  });
};

module.exports = login;
