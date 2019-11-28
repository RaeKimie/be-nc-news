const { getApiDocs } = require("../models/api-models");

exports.sendApiDocs = (req, res, next) => {
  getApiDocs().then(endpoints => {
    res.status(200).send({ endpoints });
  });
};
