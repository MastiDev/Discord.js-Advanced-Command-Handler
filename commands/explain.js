const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Event = require("../Structures/Event.js");
const { version } = require('../package.json');
const config = require("../Data/config.json");
const { MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const core = require('@hazo-development/hazo-core');

module.exports = new Command({
	name: "explain",
	description: "Hello world.",
	aliases: ["hello world"],

	async run(message, args, con, rows, client) {
		try {
			message.reply("Hello world!");
		} catch (error) {
			console.log(red(`[HAZO-COMMAND] In the command ${this.name} an error has occurred -> ${error}`))
		}
	}
});
