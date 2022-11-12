import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadCommands(client) {
	const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
	for (let i = 0; i < commandFiles.length; i++) {
		const cmd = await import(`../commands/${commandFiles[i]}`);
		await client.commands.set(cmd.default.name, cmd.default);
		console.log(chalk.greenBright(`[COMMAND] Loaded ${(chalk.yellow(commandFiles[i]))} with command ${(chalk.yellow(cmd.default.name))} ${(chalk.yellow(`[${cmd.default.aliases}]`))}`));

		if (cmd.default.aliases) {
			cmd.default.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.default);
			});
		}
	}
}

async function reloadCommands(client) {
	client.commands.clear();
	client.aliases.clear();
	const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
	for (let i = 0; i < commandFiles.length; i++) {
		const cmd = await import(`../commands/${commandFiles[i]}?${Date.now()}`);
		client.commands.set(cmd.default.name, cmd.default);
		console.log(chalk.greenBright(`[COMMAND] Reloaded ${chalk.yellow(commandFiles[i])} with command ${chalk.yellow(cmd.default.name)} ${chalk.yellow(`[${cmd.default.aliases}]`)}`));

		if (cmd.default.aliases) {
			cmd.default.aliases.forEach(async (alias)  => {
				client.aliases.set(alias, cmd.default);
			});
		}
	}
	return commandFiles.length;
}

export default { loadCommands, reloadCommands };