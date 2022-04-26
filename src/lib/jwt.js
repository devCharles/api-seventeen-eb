const jsonwebtoken = require("jsonwebtoken");
const config = require("./config");

const sign = async (payload) => {
  return await jsonwebtoken.sign(payload, config.app.jwtSecret, {
    expiresIn: "4d",
  });
};

const verify = async (token) => {
  return await jsonwebtoken.verify(token, config.app.jwtSecret);
};

module.exports = { sign, verify };