import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadButtons(client) {
	client.buttons.clear();
	const buttonFiles = readdirSync('./src/interactions/buttons').filter(file => file.endsWith('.js'));
	for (let i = 0; i < buttonFiles.length; i++) {
		const button = await import(`../interactions/buttons/${buttonFiles[i]}?${Date.now()}`);
		await client.buttons.set(button.default.id, button.default);
		console.log(chalk.greenBright(`[BUTTON] Loaded ${(chalk.yellow(buttonFiles[i]))} with button ${(chalk.yellow(button.default.id))}`));
	}
	const buttonFolders = readdirSync('./src/interactions/buttons', { withFileTypes: true }).filter(file => file.isDirectory());
	for (let i = 0; i < buttonFolders.length; i++) {
		const buttonFiles = readdirSync(`./src/interactions/buttons/${buttonFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < buttonFiles.length; j++) {
			const button = await import(`../interactions/buttons/${buttonFolders[i].name}/${buttonFiles[j]}`);
			await client.buttons.set(button.default.id, button.default);
			console.log(chalk.greenBright(`[BUTTON] Loaded ${(chalk.yellow(buttonFiles[j]))} with button ${(chalk.yellow(button.default.id))}`));
		}
	}
}

export default { loadButtons };