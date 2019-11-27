const { addComment, fetchAllComments } = require("../models/comments-models");
const { checkArticleExists } = require("../models/checkIfExists");

exports.postNewComment = (req, res, next) => {
  checkArticleExists(req.params)
    .then(() => {
      return addComment(req.params, req.body);
    })
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  checkArticleExists(req.params)
    .then(() => {
      return fetchAllComments(req.params, req.query);
    })
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
