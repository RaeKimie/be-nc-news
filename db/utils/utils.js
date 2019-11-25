exports.formatDates = list => {
  let deepCopy = JSON.parse(JSON.stringify(list));
  deepCopy.forEach(obj => {
    let milliseconds = obj.created_at;
    delete obj.created_at;
    obj.created_at = new Date(milliseconds);
  });
  return deepCopy;
};

exports.makeRefObj = list => {
  let refObj = {};

  list.forEach(obj => {
    refObj[obj.title] = obj.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(({ belongs_to, created_by, ...rest }) => {
    return { ...rest, author: created_by, article_id: articleRef[belongs_to] };
  });
};
