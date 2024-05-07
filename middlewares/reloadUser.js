const { User } = require("../models/user");
const { Unauthorized } = require("http-errors");

const tokenServise = require("../service/token-servise");

const reloadUser = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new Unauthorized("Not authorized");
  }

  try {
    // const { id } = jwt.verify(token, SECRET_KEY);

    const userData = tokenServise.validateAccessToken(token);

    // const user = await User.findById(id);
    if (!userData) {
      throw new Unauthorized("Not authorized");
    }
    req.user = userData;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = reloadUser;
