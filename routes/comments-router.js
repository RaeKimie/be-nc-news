const commentsRouter = require("express").Router();
const { handle405s } = require("../errors");
const { patchCommentById } = require("../controllers/comments-controllers");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .all(handle405s);

module.exports = commentsRouter;
