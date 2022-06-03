require("dotenv").config();

const config = {
  app: {
    port: process.env.PORT || 80,
    jwtSecret: process.env.JWT_SECRET,
  },
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    baseCollection: process.env.DB_BASE_COLLECTION,
  },
};

module.exports = config;
