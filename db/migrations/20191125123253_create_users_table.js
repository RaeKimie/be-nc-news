exports.up = function(knex) {
  return knex.schema.createTable("users", usersTable => {
    usersTable.string("username", 50).primary();
    usersTable.string("avatar_url").notNullable();
    usersTable.string("name", 20).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
