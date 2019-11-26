const { addComment } = require("../models/comments-models");
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
