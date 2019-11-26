exports.up = function(knex) {
  //console.log("creating users table");
  return knex.schema.createTable("users", usersTable => {
    usersTable.string("username", 50).primary();
    usersTable.string("avatar_url");
    usersTable.string("name", 20);
  });
};

exports.down = function(knex) {
  //console.log("dropping users table");
  return knex.schema.dropTable("users");
};
