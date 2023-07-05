import config from '../data/config.js';
import chalk from 'chalk';
import { Client, REST, Routes } from 'discord.js';

const rest = new REST({ version: '10' }).setToken(config.bot.token);

async function registerApplicationCommands(client: Client) {
	try {
		if (!client.user) throw new Error('User not available in the client.');

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const commands = new Map<string, any>();
		for (const [key, value] of client.interaction) {
			if (typeof key === 'string' && (key.startsWith('slashCommand-') || key.startsWith('contextMenu-'))) {
				commands.set(key, value);
			}
		}

		await rest.put(
			Routes.applicationCommands(client.user.id),
			{ body: [...commands.values()].map(command => command.data.toJSON()) },
		);

		console.log(chalk.greenBright('[APPLICATION] Successfully registered application commands.'));
	} catch (err) {
		console.error(err);
	}
}

export default registerApplicationCommands;