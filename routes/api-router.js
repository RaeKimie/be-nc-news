const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");
const articlesRouter = require("./articles-route");
const commentsRouter = require("./comments-router");
const { sendApiDocs } = require("../controllers/api-controller");
const { handle405s } = require("../errors");

apiRouter
  .route("/")
  .get(sendApiDocs)
  .all(handle405s);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
