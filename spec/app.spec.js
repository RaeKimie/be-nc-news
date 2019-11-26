process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app.js");
const chai = require("chai");
const { expect } = chai;

const knex = require("../db/connection");

beforeEach(() => knex.seed.run());
after(() => knex.destroy());

describe("app", () => {
  it("status:404 for invalid path", () => {
    return request(app)
      .get("/not-a-path")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.equal("path not found");
      });
  });
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
            });
        });
        it("status:200, each object contains expected keys", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body: { topics } }) => {
              expect(topics[0]).to.have.all.keys("slug", "description");
            });
        });
      });
      describe("INVALID METHODS", () => {
        it("status:405 for invalid method", () => {
          const methods = ["delete", "put", "patch", "post"];
          const promises = methods.map(method => {
            return request(app)
              [method]("/api/topics")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("method not allowed");
              });
          });
          return Promise.all(promises);
        });
      });
    });
    describe("/users", () => {
      describe("/:username", () => {
        describe("GET", () => {
          it("status:200 responds with a specific user object", () => {
            return request(app)
              .get("/api/users/butter_bridge")
              .expect(200)
              .then(({ body: { user } }) => {
                expect(user).to.have.all.keys("username", "avatar_url", "name");
              });
          });
          it("status:404 for valid but non-existent username", () => {
            return request(app)
              .get("/api/users/does-not-exist")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("user not found");
              });
          });
        });
        describe("INVALID METHODS", () => {
          it("status:405 for invalid method", () => {
            const methods = ["delete", "put", "patch", "post"];
            const promises = methods.map(method => {
              return request(app)
                [method]("/api/users/butter_bridge")
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("method not allowed");
                });
            });
            return Promise.all(promises);
          });
        });
      });
    });
    describe("/articles", () => {
      describe("/:article_id", () => {
        describe("GET", () => {
          it("status:200 resonds with a specific article object", () => {
            return request(app)
              .get("/api/articles/1")
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article).to.have.all.keys(
                  "article_id",
                  "title",
                  "body",
                  "topic",
                  "created_at",
                  "votes",
                  "comment_count"
                );
              });
          });
        });
      });
    });
  });
});
