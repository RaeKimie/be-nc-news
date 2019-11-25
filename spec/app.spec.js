process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app.js");
const chai = require("chai");
const { expect } = chai;

const knex = require("../db/connection");

beforeEach(() => knex.seed.run());
after(() => knex.destroy());

describe("app", () => {
  describe("/api", () => {
    describe("/topics", () => {
      describe("GET", () => {
        it("status:200, responds with an array of topic objects", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body: { topics } }) => {
              expect(topics).to.be.an("array");
              expect(topics.length).to.equal(3);
              expect(topics[0]).to.have.all.keys("slug", "description");
            });
        });
      });
    });
  });
});
