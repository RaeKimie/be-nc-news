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

describe("makeRefObj", () => {});

describe("formatComments", () => {});
