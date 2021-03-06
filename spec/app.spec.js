process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app.js");
const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
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
    describe("GET", () => {
      it("status:200 responds with a api documentation object", () => {
        return request(app)
          .get("/api")
          .expect(200)
          .then(({ body: { endpoints } }) => {
            expect(endpoints).to.contains.keys(
              "GET /api",
              "GET /api/topics",
              "GET /api/users/:username",
              "GET /api/articles/:article_id",
              "PATCH /api/articles/:article_id",
              "POST /api/articles/:article_id/comments",
              "GET /api/articles/:article_id/comments",
              "GET /api/articles",
              "PATCH /api/comments/:comment_id",
              "DELETE /api/comments/:comment_id"
            );
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
                  "comment_count",
                  "author"
                );
                expect(article.comment_count).to.equal("13");
              });
          });
          it("status:400 for invalid article_id", () => {
            return request(app)
              .get("/api/articles/not-valid")
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("bad request");
              });
          });
          it("status: 404 for valid but non-existent article_id", () => {
            return request(app)
              .get("/api/articles/100")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("article not found");
              });
          });
        });
        describe("PATCH", () => {
          it("status:200 responds with a updated article object", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: 1 })
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article.votes).to.equal(101);
              });
          });
          it("status:400 for invalid article_id", () => {
            return request(app)
              .patch("/api/articles/not-valid")
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("bad request");
              });
          });
          it("status: 404 for valid but non-existent article_id", () => {
            return request(app)
              .get("/api/articles/100")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("article not found");
              });
          });
          it("status:400 for invalid request data type", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: "wrongData" })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("bad request");
              });
          });
          it("status:200 for missing column in request body", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({})
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article.votes).to.equal(100);
              });
          });
        });
        describe("INVALID METHODS", () => {
          it("status:405 for invalid method", () => {
            const methods = ["delete", "put", "post"];
            const promises = methods.map(method => {
              return request(app)
                [method]("/api/articles/1")
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("method not allowed");
                });
            });
            return Promise.all(promises);
          });
        });
        describe("/comments", () => {
          describe("POST", () => {
            it("status:201 responds with a new comment object", () => {
              return request(app)
                .post("/api/articles/1/comments")
                .send({ username: "butter_bridge", body: "test" })
                .expect(201)
                .then(({ body: { comment } }) => {
                  expect(comment.author).to.equal("butter_bridge");
                  expect(comment).to.have.all.keys(
                    "comment_id",
                    "author",
                    "article_id",
                    "votes",
                    "created_at",
                    "body"
                  );
                });
            });
            it("status:400 for invalid article_id", () => {
              return request(app)
                .post("/api/articles/notvalid/comments")
                .send({ username: "butter_bridge", body: "test" })
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("bad request");
                });
            });
            it("status:404 for valid but non-existent article_id", () => {
              return request(app)
                .post("/api/articles/100/comments")
                .send({ username: "butter_bridge", body: "test" })
                .expect(422)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("unprocessable entity");
                });
            });
            it("status:400 for missing column in request body", () => {
              return request(app)
                .post("/api/articles/1/comments")
                .send({ username: "butter_bridge" })
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("bad request");
                });
            });
            it("status:422 for non-existent username", () => {
              return request(app)
                .post("/api/articles/1/comments")
                .send({ username: "test", body: "test" })
                .expect(422)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("unprocessable entity");
                });
            });
          });
          describe("GET", () => {
            it("status:200 responds with an array of comment objects", () => {
              return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments).to.be.an("array");
                  expect(comments.length).to.equal(13);
                });
            });
            it("status:200 each object contains expected keys", () => {
              return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments[0]).to.have.all.keys(
                    "comment_id",
                    "votes",
                    "created_at",
                    "author",
                    "body"
                  );
                });
            });
            it("status:200 default sort by created_at", () => {
              return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments).to.be.descendingBy("created_at");
                });
            });
            it("status:200 sort by given column in query", () => {
              return request(app)
                .get("/api/articles/1/comments?sort_by=comment_id")
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments).to.be.descendingBy("comment_id");
                });
            });
            it("status:200 sort by given column and given order in query", () => {
              return request(app)
                .get("/api/articles/1/comments?sort_by=comment_id&order=asc")
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments).to.be.ascendingBy("comment_id");
                });
            });
            it("status:400 for invalid article_id", () => {
              return request(app)
                .get("/api/articles/invalid/comments")
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("bad request");
                });
            });
            it("status:404 for valid but non-existent article_id", () => {
              return request(app)
                .get("/api/articles/100/comments")
                .expect(404)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("article not found");
                });
            });
            it("status:400 for invalid sort by column", () => {
              return request(app)
                .get("/api/articles/1/comments?sort_by=not-a-Column")
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("bad request");
                });
            });
          });
          describe("INVALID METHODS", () => {
            it("status:405 for invalid method", () => {
              const methods = ["delete", "put", "patch"];
              const promises = methods.map(method => {
                return request(app)
                  [method]("/api/articles/1/comments")
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
      describe("GET", () => {
        it("status:200 responds with an array of article Object", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).to.be.an("array");
              expect(articles.length).to.equal(12);
            });
        });
        it("status:200 each object contains expected keys", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles[0]).to.have.all.keys(
                "author",
                "title",
                "article_id",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
              expect(articles[0].comment_count).to.equal("13");
            });
        });
        it("status:200 default sort by created_at", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).to.be.descendingBy("created_at");
            });
        });
        it("status:200 sort by given column in query", () => {
          return request(app)
            .get("/api/articles?sort_by=title")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).to.be.descendingBy("title");
            });
        });
        it("status:200 sort by given column and order in query", () => {
          return request(app)
            .get("/api/articles?sort_by=author&order=asc")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).to.be.ascendingBy("author");
            });
        });
        it("status:200 filter by author when given in query", () => {
          return request(app)
            .get("/api/articles?author=butter_bridge")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles.length).to.equal(3);
            });
        });
        it("status:200 filter by author when given in query", () => {
          return request(app)
            .get("/api/articles?topic=mitch")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles.length).to.equal(11);
            });
        });
        it("status:400 for invalid sort by column ", () => {
          return request(app)
            .get("/api/articles?sort_by=not-a-column")
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("bad request");
            });
        });
        it("status:404 for non existent author", () => {
          return request(app)
            .get("/api/articles?author=not-a-username")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("author not found");
            });
        });
        it("status:404 for non existent topic", () => {
          return request(app)
            .get("/api/articles?topic=not-a-slug")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("topic not found");
            });
        });
      });
      describe("INVALID METHODS", () => {
        it("status:405 for invalid method", () => {
          const methods = ["delete", "put", "post", "patch"];
          const promises = methods.map(method => {
            return request(app)
              [method]("/api/articles")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("method not allowed");
              });
          });
          return Promise.all(promises);
        });
      });
    });
    describe("/comments", () => {
      describe("/:comment_id", () => {
        describe("PATCH", () => {
          it("status:200 responds with a updated comment object", () => {
            return request(app)
              .patch("/api/comments/1")
              .send({ inc_votes: 10 })
              .expect(200)
              .then(({ body: { comment } }) => {
                expect(comment.votes).to.equal(26);
              });
          });
          it("status:400 for invalid article_id", () => {
            return request(app)
              .patch("/api/comments/invalid")
              .send({ inc_votes: 10 })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("bad request");
              });
          });
          it("status:404 for valid but non-existent article_id", () => {
            return request(app)
              .patch("/api/comments/100")
              .send({ inc_votes: 10 })
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("comment not found");
              });
          });
          it("status:200 for missing column in request body", () => {
            return request(app)
              .patch("/api/comments/1")
              .send({})
              .expect(200)
              .then(({ body: { comment } }) => {
                expect(comment.votes).to.equal(16);
              });
          });
          it("status:400 for invalid request data type", () => {
            return request(app)
              .patch("/api/comments/100")
              .send({ inc_votes: "wrongData" })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("bad request");
              });
          });
        });
        describe("DELETE", () => {
          it("status:204 removes comment", () => {
            return request(app)
              .delete("/api/comments/1")
              .expect(204);
          });
          it("status:400 for invalid comment_id", () => {
            return request(app)
              .delete("/api/comments/invalid")
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("bad request");
              });
          });
          it("status:404 for valid but non-existent comment_id", () => {
            return request(app)
              .delete("/api/comments/100")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("comment not found");
              });
          });
        });
        describe("INVALID METHODS", () => {
          it("status:405 for invalid method", () => {
            const methods = ["put", "post", "get"];
            const promises = methods.map(method => {
              return request(app)
                [method]("/api/comments/1")
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
  });
});
