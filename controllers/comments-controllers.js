const { addComment } = require("../models/comments-models");
const { fetchArticle } = require("../models/articles-models");
exports.postNewComment = (req, res, next) => {
  fetchArticle(req.params)
    .then(() => {
      return addComment(req.params, req.body);
    })
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
