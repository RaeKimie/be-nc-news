const topicsRouter = require("express").Router();
const { handle405s } = require("../errors");
const { getAllTopics } = require("../controllers/topics-controllers");

topicsRouter
  .route("/")
  .get(getAllTopics)
  .all(handle405s);

module.exports = topicsRouter;
