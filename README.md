# News-press Back-End Project

**This project has been setup to build the API endpoints for News-press Front-End project, which interacts with PSQL database using [Knex](http://knexjs.org/). **



## :star2: Getting Started

You will need to follow the instructions below to run this repo.



### :scroll: Prerequisites

This project has been built on the following versions of software and libraries.



```
node v12.8.1
postgreSQL v10.10
express v4.17.1
knex v0.20.2
node-postgres v7.14.0
```



### :bulb: Install

`git clone https://github.com/RaeKimie/be-nc-news.git`

In your terminal, cd into the cloned repo.

`cd be-nc-news`

`npm install` 

Now, everything is installed you need.:sparkles: 



## :rocket: Running the tests 

### :stars: Step1

#### Ubuntu user

Create a config.js file in the root directory.

```javascript
//in config.js file
exports.details = { username: "", password: "" };
//put your own username and password for psql
```



#### Mac user

Delete a few lines in knexfile.js.

**This is codes you need to delete.**

```javascript
//in knexfile.js in root directory

const {
  details: { username, password }
} = require("./config");
 
 //all
 username, password

```



**This is what your knexfile.js would look like after deletion.**

```javascript
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  seeds: { directory: "./db/seeds" },
  client: "pg",
  migrations: { directory: "./db/migrations" }
};

const customConfig = {
  production: { connection: `${DB_URL}?ssl=true` },
  development: { connection: { database: "nc_news" } },
  test: { connection: { database: "nc_news_test"} }
};

module.exports = { ...baseConfig, ...customConfig[ENV] };
```



### :stars: Step2

Let's get familiar with the npm scripts you need to run the test.

```javascript
//in package.json file 
"scripts": {
    "setup-dbs": "psql -f ./db/setup.sql",
    "seed": "knex seed:run",
    "test-utils": "mocha spec/utils.spec.js",
    "test": "mocha spec/app.spec.js",
    "migrate-latest": "knex migrate:latest",
    "migrate-rollback": "knex migrate:rollback"
  }
```

- **setup-dbs** : Creates the database.
- **migrate-rollback**: Takes the tables back to the last batch of migrations.
- **migrate-latest**: Fills the tables with the data.
- **seed**: Seeds the database with the data using util functions to manipulate the structure of the input data.
- **test-utils**: Runs tests for utils functions.
- **test**: Runs tests for server.



## :house: Hosted Site

This server has been hosted using Heroku. You can find it [here](https://news-press.herokuapp.com/api).



## :clap:Acknowledgments

Build under guidance and with help from the Northcoders Team.