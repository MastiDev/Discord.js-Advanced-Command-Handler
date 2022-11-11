export default {
	event: 'messageCreate',
	async execute(client, message) {
		let prefix = '!'; //await getprefix(message.guild.id); // MySQL WIP

		if (message.content.startsWith(prefix)) {
			const args = message.content.substring(prefix.length).split(/ +/);
			const command = client.commands.find(cmd => cmd.name == args[0] || cmd.aliases.includes(args[0]));
			if (!command) return; //message.reply(`${args[0]} is not a valid command!`); //uncomment if you want that the bot replies when the command is not a valid command!
			command.execute(message, args, client);
		} else {
			// Here you can add commands that are not have a prefix.
			// like when somebody pings the bot.
		}
	}
};