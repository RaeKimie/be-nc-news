const articlesRouter = require("express").Router();
const { handle405s } = require("../errors");
const {
  getArticleById,
  patchArticleById
} = require("../controllers/articles-controllers");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handle405s);

module.exports = articlesRouter;
