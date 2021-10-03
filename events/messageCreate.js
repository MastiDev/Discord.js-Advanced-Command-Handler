const Command = require("../Structures/Command.js");
const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");
const { MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const { version } = require('../package.json');

let prefix = config.prefix

module.exports = new Event("messageCreate", async (client, message) => {
	try {
		if (message.author.bot) return;

		if (message.content.startsWith(prefix)) {
	
			const args = message.content.substring(prefix.length).split(/ +/);
			const command = client.commands.find(cmd => cmd.name == args[0] || cmd.aliases.includes(args[0]));
			if (!command) return message.reply(`${args[0]} is not a valid command!`);
			command.run(message, args, client)
		}
		} catch (error) {
		return console.log(red(`[EVENT] In the event messageCreate an error has occurred -> ${error}`))
	}	
});