# News-press Back-End Project:tada::satisfied:

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

Now, everything is installed you need to run this:exclamation::sparkles: 



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

Delete a few lines in knexfile.js

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

