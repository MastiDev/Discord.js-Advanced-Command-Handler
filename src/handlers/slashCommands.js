import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadSlashCommands(client) {
	client.slashCommands.clear();
	let files = 0;
	const slashCommands = readdirSync('./src/interactions/slashCommands').filter(file => file.endsWith('.js'));
	if (!slashCommands) return;
	for (let i = 0; i < slashCommands.length; i++) {
		const commands = await import(`../interactions/slashCommands/${slashCommands[i]}?${Date.now()}`);
		client.slashCommands.set(commands.default.data.toJSON().name, commands.default);
		console.log(chalk.greenBright(`[SLASHCOMMAND] Loaded ${chalk.yellow(slashCommands[i])} with command ${chalk.yellow(commands.default.data.toJSON().name)}`));
		files++;
	}
	const slashCommandFolders = readdirSync('./src/interactions/slashCommands', { withFileTypes: true }).filter(file => file.isDirectory());
	if (!slashCommandFolders) return;
	for (let i = 0; i < slashCommandFolders.length; i++) {
		const slashCommands = readdirSync(`./src/interactions/slashCommands/${slashCommandFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < slashCommands.length; j++) {
			const commands = await import(`../interactions/slashCommands/${slashCommandFolders[i].name}/${slashCommands[j]}`);
			client.slashCommands.set(commands.default.data.toJSON().name, commands.default);
			console.log(chalk.greenBright(`[SLASHCOMMAND] Loaded ${chalk.yellow(slashCommands[j])} with command ${chalk.yellow(commands.default.data.toJSON().name)}`));
			files++;
		}
	}
	return files;
}

export default { loadSlashCommands };