const knex = require("../db/connection");

exports.fetchTopics = () => {
  return knex.select("*").from("topics");
};
