exports.formatDates = list => {
  let deepCopy = JSON.parse(JSON.stringify(list));
  deepCopy.forEach(obj => {
    let milliseconds = obj.created_at;
    delete obj.created_at;
    obj.created_at = new Date(milliseconds);
  });
  return deepCopy;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
