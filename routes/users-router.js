const usersRouter = require("express").Router();
const { handle405s } = require("../errors");
const { getUserById } = require("../controllers/users-controller");

usersRouter
  .route("/:username")
  .get(getUserById)
  .all(handle405s);

module.exports = usersRouter;
