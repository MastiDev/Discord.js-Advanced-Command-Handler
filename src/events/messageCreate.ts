import config from '../data/config.js';
import { Client, Message } from 'discord.js';

interface CustomCommand {
	id: string;
	type: string;
	disabled: boolean;
	aliases: string[];
	execute(client: Client, message: Message, args: string[]): Promise<void>;
}

export default {
	event: 'messageCreate',
	async execute(client: Client, message: Message) {
		try {
			if (message.author.bot) return;

			if (message.content.startsWith(config.bot.prefix)) {
				const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/);
				const command = client.interaction.get(`messageCommand-${args[0]}`) as CustomCommand;
				if (!command) return;
				try {
					await command.execute(client, message, args);
				} catch (error) {
					await message.reply('There was an error trying to execute that command!');
					console.log(error);
				}
			}

		} catch (error) {
			console.log(error);
		}
	}
};