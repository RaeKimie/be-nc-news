const { readFile } = require("fs");

exports.getApiDocs = () => {
  return new Promise((resolve, reject) => {
    readFile("./endpoints.json", "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};
