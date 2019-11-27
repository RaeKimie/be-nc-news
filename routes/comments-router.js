const commentsRouter = require("express").Router();
const { handle405s } = require("../errors");
const {
  patchCommentById,
  deleteCommentById
} = require("../controllers/comments-controllers");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(handle405s);

module.exports = commentsRouter;
