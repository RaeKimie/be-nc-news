const articlesRouter = require("express").Router();
const { handle405s } = require("../errors");
const {
  getArticleById,
  patchArticleById,
  getAllArticles
} = require("../controllers/articles-controllers");
const {
  postNewComment,
  getCommentsByArticleId
} = require("../controllers/comments-controllers");

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all(handle405s);
articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handle405s);

articlesRouter
  .route("/:article_id/comments")
  .post(postNewComment)
  .get(getCommentsByArticleId)
  .all(handle405s);

module.exports = articlesRouter;
