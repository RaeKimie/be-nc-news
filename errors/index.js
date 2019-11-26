exports.handle400s = (err, req, res, next) => {
  const errCode = ["22P02"];
  if (errCode.includes(err.code)) res.status(400).send({ msg: "bad request" });
  else next(err);
};

exports.handleCustoms = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "server error" });
};

//error controllers

exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};
