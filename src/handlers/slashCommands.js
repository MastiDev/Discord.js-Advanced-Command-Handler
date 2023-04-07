import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import chalk from 'chalk';
import config from '../data/config.js';

const rest = new REST({ version: '10' }).setToken(config.bot.token);

async function loadSlashCommands(client) {
	const slashCommands = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
	for (let i = 0; i < slashCommands.length; i++) {
		const command = await import(`../commands/${slashCommands[i]}?${Date.now()}`);
		client.slashCommands.set(command.default.data.toJSON().name, command.default);
		console.log(chalk.greenBright(`[SLASHCOMMAND] Loaded ${chalk.yellow(slashCommands[i])} with command ${chalk.yellow(command.default.data.toJSON().name)}`));
	}
	rest.put(
		Routes.applicationCommands(client.user.id),
		{ body: client.slashCommands.map(cmd => cmd.data.toJSON()) },
	);
}

async function reloadSlashCommands(client) {
	client.slashCommands.clear();
	const slashCommands = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
	for (let i = 0; i < slashCommands.length; i++) {
		const command = await import(`../commands/${slashCommands[i]}`);
		client.slashCommands.set(command.default.data.toJSON().name, command.default);
		console.log(chalk.greenBright(`[SLASHCOMMAND] Reloaded ${chalk.yellow(slashCommands[i])} with command ${chalk.yellow(command.default.data.toJSON().name)}`));
	}
	rest.put(
		Routes.applicationCommands(client.user.id),
		{ body: client.slashCommands.map(cmd => cmd.data.toJSON()) },
	);
	return slashCommands.length;
}

export default { loadSlashCommands, reloadSlashCommands };