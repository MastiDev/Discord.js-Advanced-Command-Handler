console.clear();

const Client = require("./structures/client.js");
const client = new Client();
const config = require("./data/config.json");

process.on('uncaughtException', function (err) {
  console.error(err);
});

client.start(config.bot.token);