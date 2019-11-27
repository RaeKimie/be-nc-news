const knex = require("../db/connection");
exports.fetchArticle = ({ article_id }) => {
  return knex
    .select(
      "articles.author",
      "articles.votes",
      "articles.created_at",
      "topic",
      "title",
      "articles.article_id"
    )
    .count("comment_id as comment_count")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .modify(query => {
      if (article_id)
        query.where("articles.article_id", article_id).select("articles.*");
    })
    .groupBy("articles.article_id")
    .then(article => {
      return article.length === 0
        ? Promise.reject({ status: 404, msg: "article not found" })
        : article;
    });
};

exports.updateArticle = ({ article_id }, { inc_votes = 0 }) => {
  return knex("articles")
    .where("article_id", "=", article_id)
    .increment("votes", inc_votes)
    .returning("*");
};
