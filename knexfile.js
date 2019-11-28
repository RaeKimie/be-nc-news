const { DB_URL } = process.env;
const {
  details: { username, password }
} = require("./config");

const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  seeds: { directory: "./db/seeds" },
  client: "pg",
  migrations: { directory: "./db/migrations" }
};

const customConfig = {
  production: { connection: `${DB_URL}?ssl=true` },
  development: { connection: { database: "nc_news", username, password } },
  test: { connection: { database: "nc_news_test", username, password } }
};

module.exports = { ...baseConfig, ...customConfig[ENV] };
