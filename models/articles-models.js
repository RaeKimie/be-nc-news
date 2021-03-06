const knex = require("../db/connection");
exports.selectArticle = ({
  article_id,
  sort_by = "created_at",
  order = "desc",
  author,
  topic
}) => {
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
      if (author) query.where("articles.author", author);
      if (topic) query.where("topic", topic);
    })
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .then(article => {
      return article_id && article.length === 0
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
