const { fetchArticle } = require("../models/articles-models");

exports.getArticleById = (req, res, next) => {
  fetchArticle(req.params)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
