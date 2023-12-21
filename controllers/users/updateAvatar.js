const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  try {
    const imageName = `${id}_${originalname}`;
    const resultUpload = path.join(
      __dirname,
      "../../",
      "public",
      "avatars",
      imageName
    );

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json(avatarURL);
  } catch {
    fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;
