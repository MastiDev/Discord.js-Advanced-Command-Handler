console.clear();

const Discord = require("discord.js");
const Client = require("./Structures/Client.js");
const client = new Client();

const config = require("./Data/config.json");

client.start(config.token);
