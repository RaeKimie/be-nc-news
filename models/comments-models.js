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

exports.updateComment = ({ comment_id }, { inc_votes = 0 }) => {
  return knex("comments")
    .where("comment_id", "=", comment_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(comment => {
      return comment.length === 0
        ? Promise.reject({ status: 404, msg: "comment not found" })
        : comment;
    });
};

exports.removeComment = ({ comment_id }) => {
  return knex("comments")
    .where("comment_id", "=", comment_id)
    .del()
    .then(delCount => {
      return delCount === 0
        ? Promise.reject({ status: 404, msg: "comment not found" })
        : delCount;
    });
};
