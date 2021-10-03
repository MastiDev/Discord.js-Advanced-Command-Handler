const Command = require("../Structures/Command.js");
const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");
const { MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const { version } = require('../package.json');

module.exports = new Command({
	name: "hello",
	description: "Hello world.",
	aliases: ["hey", "hi"],

	async run(message, args, client) {
		try {
			message.reply("Hello world!");
		} catch (error) {
			console.log(red(`[COMMAND] In the command ${this.name} an error has occurred -> ${error}`))
		}
	}
});
