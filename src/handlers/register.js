import config from '../data/config.js';
import { REST, Routes } from 'discord.js';
const rest = new REST({ version: '10' }).setToken(config.bot.token);

async function load(client) {
	const commands = new Map();
	for (const [key, value] of client.slashCommands) {
		commands.set(key, value);
	}
	for (const [key, value] of client.contextMenus) {
		commands.set(key, value);
	}
	
	await rest.put(
		Routes.applicationCommands(client.user.id),
		{ body: [...commands.values()].map(command => command.data.toJSON()) },
	);
}

export default { load };