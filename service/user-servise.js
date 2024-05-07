const { User } = require("../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const uuid = require("uuid");
const mailServise = require("./mail-service");
const tokenServise = require("./token-servise");
const UserDto = require("../dto/dto");
const { Unauthorized } = require("http-errors");

class Userservise {
  async registration(email, password, name) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw new Conflict("This user has already exist");
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const activationLink = uuid.v4();

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      avatarURL,
      activationLink,
    });
    await mailServise.sendActivationMail(
      email,
      `${process.env.API_URL}/api/auth/activate/${activationLink}`,
      name
    );
    const userDto = new UserDto(user);

    const tokens = tokenServise.generateTokens({ ...userDto });
    await tokenServise.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activateLink) {
    const user = await User.findOne({ activationLink: activateLink });

    if (!user) throw new Error("Некоректная ссылка активации");

    user.isActivated = true;

    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized("Email not found");
    }

    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!passwordCompare) {
      throw new Unauthorized("password wrong");
    }
    const userDto = new UserDto(user);

    const tokens = tokenServise.generateTokens({ ...userDto });
    await tokenServise.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenServise.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Unauthorized("No token");
    }
    const userData = tokenServise.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenServise.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new Unauthorized("No token or no userData");
    }

    const user = User.findById(userData.id);
    const userDto = new UserDto(user);

    const tokens = tokenServise.generateTokens({ ...userDto });
    await tokenServise.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new Userservise();
