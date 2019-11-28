const { selectArticle, updateArticle } = require("../models/articles-models");
const { selectUserById } = require("../models/users-models");
const { checkTopicExists } = require("../models/checkIfExists");

exports.getArticleById = (req, res, next) => {
  selectArticle(req.params)
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
  let promiseArr = [selectArticle(req.query)];

  if (author) promiseArr.push(selectUserById(req.query));
  if (topic) promiseArr.push(checkTopicExists(req.query));
  return Promise.all(promiseArr)
    .then(([articles]) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
