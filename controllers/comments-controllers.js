const {
  addComment,
  fetchAllComments,
  updateComment,
  removeComment
} = require("../models/comments-models");
const { checkArticleExists } = require("../models/checkIfExists");

exports.postNewComment = (req, res, next) => {
  addComment(req.params, req.body)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  return Promise.all([
    fetchAllComments(req.params, req.query),
    checkArticleExists(req.params)
  ])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  updateComment(req.params, req.body)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  removeComment(req.params)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
