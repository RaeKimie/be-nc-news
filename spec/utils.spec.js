const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns an empty array when given an empty array", () => {
    const input = [];
    const output = [];
    expect(formatDates(input)).to.deep.equal(output);
  });
  it("returns an array of objects with modified created_at values", () => {
    const input = [
      {
        test: "test",
        created_at: 1542284514171
      }
    ];
    const output = [
      {
        test: "test",
        created_at: new Date(1542284514171)
      }
    ];
    expect(formatDates(input)).to.deep.equal(output);
  });
  it("returns an array of objects with modified created_at values", () => {
    const input = [
      {
        test: "test",
        created_at: 1542284514171
      },
      {
        test: "test test",
        created_at: 1416140514171
      }
    ];
    const output = [
      {
        test: "test",
        created_at: new Date(1542284514171)
      },
      {
        test: "test test",
        created_at: new Date(1416140514171)
      }
    ];
    expect(formatDates(input)).to.deep.equal(output);
  });
  it("does not mutate the original array", () => {
    const input = [
      {
        test: "test",
        created_at: 1542284514171
      }
    ];
    formatDates(input);
    expect(input).to.deep.equal([
      {
        test: "test",
        created_at: 1542284514171
      }
    ]);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object when given an empty array", () => {
    const input = [];
    const output = {};
    expect(makeRefObj(input)).to.deep.equal(output);
  });
  it("returns a new object which has the passed array of objects values as key -value pairs", () => {
    const input = [
      { article_id: 1, title: "Does Mitch predate civilisation?" },
      { article_id: 2, title: "article title 2" }
    ];
    const output = {
      "Does Mitch predate civilisation?": 1,
      "article title 2": 2
    };
    expect(makeRefObj(input)).to.deep.equal(output);
  });
  it("does not mutate the original array", () => {
    const input = [
      { article_id: 1, title: "Does Mitch predate civilisation?" }
    ];
    makeRefObj(input);
    expect(input).to.deep.equal([
      { article_id: 1, title: "Does Mitch predate civilisation?" }
    ]);
  });
});

describe.only("formatComments", () => {
  it("returns an empty array when given an empty array", () => {
    const input = [];

    const output = [];
    expect(formatComments(input)).to.deep.equal(output);
  });
  it("returns a formmated array of object using refObj", () => {
    const input = [
      {
        body: "test",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge"
      },
      {
        body: "test2",
        belongs_to: "article title",
        created_by: "narae"
      }
    ];
    const refObj = {
      "They're not exactly dogs, are they?": 1,
      "article title": 2
    };
    const output = [
      {
        body: "test",
        article_id: 1,
        author: "butter_bridge"
      },
      {
        body: "test2",
        article_id: 2,
        author: "narae"
      }
    ];
    expect(formatComments(input, refObj)).to.deep.equal(output);
  });
  it("does not mutate the original array", () => {
    const input = [
      {
        body: "test",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge"
      }
    ];
    const refObj = {
      "They're not exactly dogs, are they?": 1
    };
    formatComments(input, refObj);
    expect(input).to.deep.equal([
      {
        body: "test",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge"
      }
    ]);
  });
});
