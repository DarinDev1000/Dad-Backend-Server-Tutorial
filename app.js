const Koa = require('koa');
const body = require('koa-body'); // body parser
const mysql = require("mysql2/promise");

const app = new Koa();

require('dotenv').config(); // loads environment variables from .env file

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});


// parse request body into ctx.request.body
app.use(body());


// MySQL connection config
const config = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  charset: 'utf8mb4',
};

// Create mysql connection pool
const connectionPool = mysql.createPool(config);

// set up MySQL connection - App DB
app.use(async function mysqlConnection(ctx, next) {
  try {
    // keep copy of ctx.state.db in global for access from models
    ctx.state.db = await connectionPool.getConnection();
    ctx.state.db.connection.config.namedPlaceholders = true;

    await next();

    ctx.state.db.release();
  } catch (err) {
    // note if getConnection() fails we have no this.state.db, but if anything downstream throws,
    // we need to release the connection
    if (ctx.state.db) ctx.state.db.release();
    throw err;
  }
});


app.use(async function (ctx, next) {
  await next();
  ctx.body = {
    status: 200,
    body: ctx.body
  };
});

// PUBLIC ROUTES
app.use(require('./routes/my-routes.route'));
app.use(require('./routes/users.route'));
app.use(require('./routes/python.route'));



/* create server - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

app.listen(process.env.PORT || 3000);
console.info(
  `${process.version} listening on port ${process.env.PORT || 3000} (${
    app.env
  }/${config.database}) 
  http://localhost:${process.env.PORT || 3000}`
);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


module.exports = app;