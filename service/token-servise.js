const jwt = require("jsonwebtoken");
const tokenModal = require("../models/token");

const { SECRET_KEY_ACCESS, SECRET_KEY_REFRESCH } = process.env;

class Tokenservise {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, SECRET_KEY_ACCESS, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, SECRET_KEY_REFRESCH, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, SECRET_KEY_ACCESS);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, SECRET_KEY_REFRESCH);
      return userData;
    } catch (e) {}
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModal.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = tokenModal.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModal.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModal.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new Tokenservise();
