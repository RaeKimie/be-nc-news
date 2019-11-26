const knex = require("../db/connection");
exports.addComment = ({ article_id }, { username, body }) => {
  const newComment = { article_id, author: username, body };
  return knex("comments")
    .insert(newComment)
    .returning("*");
};
