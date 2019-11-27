const knex = require("../db/connection");
exports.addComment = ({ article_id }, { username, body }) => {
  return knex("comments")
    .insert({ article_id, author: username, body })
    .returning("*");
};

exports.fetchAllComments = (
  { article_id },
  { sort_by = "created_at", order = "desc" }
) => {
  return knex
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where("article_id", "=", article_id)
    .orderBy(sort_by, order);
};
