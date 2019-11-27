const { fetchArticle, updateArticle } = require("../models/articles-models");

const {
  checkUsernameExists,
  checkTopiceExists
} = require("../models/checkIfExists");

exports.getArticleById = (req, res, next) => {
  fetchArticle(req.params)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  updateArticle(req.params, req.body)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { author, topic } = req.query;
  let promiseArr = [fetchArticle(req.query)];
  if (author) promiseArr.push(checkUsernameExists(req.query));
  if (topic) promiseArr.push(checkTopiceExists(req.query));
  return Promise.all(promiseArr)
    .then(([articles]) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
