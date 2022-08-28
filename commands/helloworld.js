const Command = require("../structures/command.js");

module.exports = new Command({
	name: "hello",
	description: "Hello world.",
	aliases: ["hey", "hi"],

	async run(message, args, client) {
		try {
			message.reply("Hello World!");
		} catch (error) {
			console.log(error);
		}
	}
});
