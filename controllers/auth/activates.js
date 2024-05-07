const userServise = require("../../service/user-servise");

const activates = async (req, res) => {
  const activateLink = req.params.link;

  await userServise.activate(activateLink);
  return res.redirect(process.env.SITE_URL);
};

module.exports = activates;
