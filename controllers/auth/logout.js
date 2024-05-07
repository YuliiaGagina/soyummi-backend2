// const { User } = require("../../models");
const userServise = require("../../service/user-servise");
const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  const token = await userServise.logout(refreshToken);
  res.clearCookie("refreshToken");
  // const { _id } = req.user;
  // await User.findByIdAndUpdate(_id, { token: null });
  // res.status(204).json();

  return res.json(token);
};

module.exports = logout;
