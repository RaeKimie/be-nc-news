const articlesRouter = require("express").Router();
const { handle405s } = require("../errors");
const {
  getArticleById,
  patchArticleById
} = require("../controllers/articles-controllers");
const { postNewComment } = require("../controllers/comments-controllers");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handle405s);

articlesRouter.route("/:article_id/comments").post(postNewComment);

module.exports = articlesRouter;
