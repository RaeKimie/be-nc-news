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

exports.checkTopicExists = ({ topic }) => {
  return knex("topics")
    .select("*")
    .where("slug", topic)
    .then(([topic]) => {
      if (!topic)
        return Promise.reject({ status: 404, msg: "topic not found" });
    });
};
