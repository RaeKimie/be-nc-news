const knex = require("../db/connection");

exports.checkIfUsernameExists = ({ username }) => {
  return knex("users")
    .select("*")
    .where("username", username)
    .then(res => {
      console.log(res, "<--in checkExists");
    });
};
