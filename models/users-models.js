const knex = require("../db/connection");
exports.selectUserById = ({ username, author }) => {
  return knex("users")
    .modify(query => {
      if (username) query.select("*").where("username", username);
      if (author) query.select("username").where("username", author);
    })
    .then(user => {
      if (username && user.length === 0) {
        return Promise.reject({ status: 404, msg: "user not found" });
      } else if (author && user.length === 0) {
        return Promise.reject({ status: 404, msg: "author not found" });
      } else {
        return user;
      }
    });
};
