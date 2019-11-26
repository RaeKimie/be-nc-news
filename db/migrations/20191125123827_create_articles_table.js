exports.up = function(knex) {
  //  console.log("creating articles table");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title", 100).notNullable();
    articlesTable.text("body").notNullable();
    articlesTable.integer("votes").defaultTo(0);

    articlesTable
      .string("topic")
      .references("topics.slug")
      .notNullable();
    articlesTable
      .string("author")
      .references("users.username")
      .notNullable();
    articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  //console.log("dropping articles table");
  return knex.schema.dropTable("articles");
};
