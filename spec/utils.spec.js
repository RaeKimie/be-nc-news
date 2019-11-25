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

describe.only("makeRefObj", () => {
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

describe("formatComments", () => {});
