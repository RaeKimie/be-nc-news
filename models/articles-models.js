const knex = require("../db/connection");
exports.fetchArticle = ({ article_id }) => {
  return knex
    .select("articles.*")
    .count("comment_id as comment_count")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .then(article => {
      return article.length === 0
        ? Promise.reject({ status: 404, msg: "article not found" })
        : article;
    });
};
