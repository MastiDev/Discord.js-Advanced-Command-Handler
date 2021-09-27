const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Event = require("../Structures/Event.js");
const mysql = require('mysql');
const { version } = require('../package.json');
const config = require("../Data/config.json");
const { MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const core = require('@hazo-development/hazo-core');

var con = mysql.createConnection({multipleStatements: true,
    host: "IP",
    user: "USER",
    password: "PASSWORD",
    database: "DATABASE"
});

module.exports = new Event("messageCreate", async (client, message) => {

});