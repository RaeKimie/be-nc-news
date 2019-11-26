const { addComment } = require("../models/comments-models");
exports.postNewComment = (req, res, next) => {
  addComment(req.params, req.body)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
