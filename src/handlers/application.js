import config from '../data/config.js';
import chalk from 'chalk';
import { REST, Routes } from 'discord.js';
const rest = new REST({ version: '10' }).setToken(config.bot.token);

async function registerApplicationCommands(client) {
	try {
		let commands = new Map();
		for (const [key, value] of client.interaction) {
			if (key.startsWith('slashCommand-') || key.startsWith('contextMenu-')) commands.set(key, value);
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