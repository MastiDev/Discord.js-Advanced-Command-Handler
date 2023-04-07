import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadSlashCommands(client) {
	const slashCommands = readdirSync('./src/interactions/commands').filter(file => file.endsWith('.js'));
	for (let i = 0; i < slashCommands.length; i++) {
		const command = await import(`../interactions/commands/${slashCommands[i]}`);
		client.slashCommands.set(command.default.data.toJSON().name, command.default);
		console.log(chalk.greenBright(`[SLASHCOMMAND] Loaded ${chalk.yellow(slashCommands[i])} with command ${chalk.yellow(command.default.data.toJSON().name)}`));
	}
}

async function reloadSlashCommands(client) {
	client.slashCommands.clear();
	const slashCommands = readdirSync('./src/interactions/commands').filter(file => file.endsWith('.js'));
	for (let i = 0; i < slashCommands.length; i++) {
		const command = await import(`../interactions/commands/${slashCommands[i]}?${Date.now()}`);
		client.slashCommands.set(command.default.data.toJSON().name, command.default);
		console.log(chalk.greenBright(`[SLASHCOMMAND] Reloaded ${chalk.yellow(slashCommands[i])} with command ${chalk.yellow(command.default.data.toJSON().name)}`));
	}
	return slashCommands.length;
}

export default { loadSlashCommands, reloadSlashCommands };