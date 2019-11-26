const knex = require("../db/connection");
exports.fetchUserById = ({ username }) => {
  return knex("users")
    .select("*")
    .where("username", username)
    .then(user => {
      return user.length === 0
        ? Promise.reject({ status: 404, msg: "user not found" })
        : user;
    });
};
