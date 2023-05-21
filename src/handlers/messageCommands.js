import chalk from 'chalk';
import { readdirSync } from 'fs';

async function loadMessageCommands(client) {
	client.messageCommands.clear();
	client.messageCommandsAliases.clear();
	let files = 0;
	const commandFiles = readdirSync('./src/interactions/messageCommands').filter(file => file.endsWith('.js'));
	if (!commandFiles) return;
	for (let i = 0; i < commandFiles.length; i++) {
		const command = await import(`../interactions/messageCommands/${commandFiles[i]}?${Date.now()}`);
		if (command.default.aliases) {
			command.default.aliases.forEach(alias => {
				client.messageCommandsAliases.set(alias, command.default);
			});
		}
		client.messageCommands.set(command.default.name, command.default);
		console.log(chalk.greenBright(`[COMMAND] Loaded ${(chalk.yellow(commandFiles[i]))} with command ${(chalk.yellow(command.default.name))}`));
		files++;
	}
	const commandFolders = readdirSync('./src/interactions/messageCommands', { withFileTypes: true }).filter(file => file.isDirectory());
	if (!commandFolders) return;
	for (let i = 0; i < commandFolders.length; i++) {
		const commandFiles = readdirSync(`./src/interactions/messageCommands/${commandFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < commandFiles.length; j++) {
			const command = await import(`../interactions/messageCommands/${commandFolders[i].name}/${commandFiles[j]}?${Date.now()}`);
			if (command.default.aliases) {
				command.default.aliases.forEach(alias => {
					client.messageCommandsAliases.set(alias, command.default);
				});
			}
			client.messageCommands.set(command.default.name, command.default);
			console.log(chalk.greenBright(`[COMMAND] Loaded ${(chalk.yellow(commandFiles[j]))} with command ${(chalk.yellow(command.default.name))}`));
			files++;
		}
	}
	return files;
}

export default { loadMessageCommands };