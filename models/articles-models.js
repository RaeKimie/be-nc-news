const knex = require("../db/connection");
exports.fetchArticle = ({ article_id }) => {
  return knex
    .select("articles.*", "comment_id")
    .from("articles")
    .join("comments", "articles.article_id", "=", "comments.article_id")
    .where("articles.article_id", article_id)
    .then(what => {
      console.log(what);
      return what;
    });
};
