const articlesRouter = require("express").Router();
const { handle405s } = require("../errors");
const { getArticleById } = require("../controllers/articles-controllers");

articlesRouter
  .route("/:username")
  .get(getArticleById)
  .all(handle405s);

module.exports = articlesRouter;
