import config from '../data/config.js';

export default {
	event: 'messageCreate',
	async execute(client, message) {
		try {
			if (message.author.bot) return;

			if (message.content.startsWith(config.bot.prefix)) {
				const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/);
				const command = client.messageCommands.get(args[0]) || client.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
				if (!command) return;
				try {
					command.execute(client, message, args);
				} catch (error) {
					message.reply('There was an error trying to execute that command!');
					console.log(error);
				}
			}

		} catch (error) {
			console.log(error);
		}
	}
};