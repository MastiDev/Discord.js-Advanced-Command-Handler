const Command = require("../structures/command.js");
const { red } = require('chalk');
const embeds = require('../utils/embeds.js');

module.exports = new Command({
	name: "hello",
	description: "Hello world.",
	aliases: ["hey", "hi"],

	async run(message, args, client) {
		try {
			
			message.reply("Hello world!");

		} catch (error) {
			embeds.errorEmbed(client, message, "Something went wrong.");
			console.log(red(`[COMMAND] In the command ${this.name} an error has occurred -> ${error}`))
		}
	}
});
