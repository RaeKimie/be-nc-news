const knex = require("../db/connection");

exports.checkArticleExists = ({ article_id }) => {
  return knex("articles")
    .select("*")
    .where("article_id", article_id)
    .then(([article]) => {
      if (!article)
        return Promise.reject({ status: 404, msg: "article not found" });
    });
};

exports.checkUsernameExists = ({ author }) => {
  return knex("users")
    .select("*")
    .where("username", author)
    .then(([user]) => {
      if (!user)
        return Promise.reject({ status: 404, msg: "author not found" });
    });
};
