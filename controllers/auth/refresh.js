const userServise = require("../../service/user-servise");

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  const userData = await userServise.refresh(refreshToken);

  res.cookie("refreshToken", userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httponly: true,
  });

  return res.json(userData);
};

module.exports = refresh;
