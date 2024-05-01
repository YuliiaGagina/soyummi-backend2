// const { User } = require("../../models");
const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = getCurrent;

function findPath(mountain) {
  const oneOff = mountain.map((row) => row.slice());

  for (let i = oneOff.length - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      oneOff[i][j] += Math.max(oneOff[i + 1][j], oneOff[i + 1][j + 1]);
    }
  }

  return oneOff[0][0];
}

const mountain = [[6], [7, 10], [12, 11, 9], [90, 25, 13, 14]];
const result = findPath(mountain);
console.log("Результат:", result); // Виведе: 115
