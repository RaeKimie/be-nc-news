exports.formatDates = list => {
  return list.map(({ created_at, ...rest }) => {
    return { ...rest, created_at: new Date(created_at) };
  });
};

exports.makeRefObj = list => {
  let refObj = {};

  list.forEach(obj => {
    refObj[obj.title] = obj.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(({ belongs_to, created_by, created_at, ...rest }) => {
    return {
      ...rest,
      created_at: new Date(created_at),
      author: created_by,
      article_id: articleRef[belongs_to]
    };
  });
};
