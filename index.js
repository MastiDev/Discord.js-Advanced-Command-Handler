console.clear();

const Client = require("./structures/client.js");
const client = new Client();
const config = require("./data/config.json");
const { yellow } = require('chalk');

const mysql = require('mysql2');
const util = require('util');

var con = mysql.createPool({
    host: `${config.mysql.host}`,
    port: `${config.mysql.port}`,
    user: `${config.mysql.user}`,
    password: `${config.mysql.password}`,
    database: `${config.mysql.database}`
});

const dbquery = util.promisify(con.query).bind(con);

// Check if Table Exists if not the bot will create it
dbquery(`SHOW TABLES LIKE 'guilds'`).then(async (rows) => {
  if (rows.length < 1) {
    dbquery(`CREATE TABLE guilds (
      id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      guildid VARCHAR(50) NULL DEFAULT '0' COLLATE 'utf8mb4_0900_ai_ci',
      prefix VARCHAR(50) NULL DEFAULT '!' COLLATE 'utf8mb4_0900_ai_ci',
      PRIMARY KEY (id) USING BTREE,
      UNIQUE INDEX guildid (guildid) USING BTREE
      );`)
    console.log(yellow(`[MySQL] Created table guilds`));
  }
})

process.on('uncaughtException', function (err) {
  console.error(err);
});

client.start(config.bot.token);