import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadButtons(client) {
	const buttonFiles = readdirSync('./src/interactions/buttons').filter(file => file.endsWith('.js'));
	for (let i = 0; i < buttonFiles.length; i++) {
		const button = await import(`../interactions/buttons/${buttonFiles[i]}`);
		await client.buttons.set(button.default.id, button.default);
		console.log(chalk.greenBright(`[BUTTON] Loaded ${(chalk.yellow(buttonFiles[i]))} with button ${(chalk.yellow(button.default.id))}`));
	}
}

async function reloadButtons(client) {
	client.buttons.clear();
	const buttonFiles = readdirSync('./src/interactions/buttons').filter(file => file.endsWith('.js'));
	for (let i = 0; i < buttonFiles.length; i++) {
		const button = await import(`../interactions/buttons/${buttonFiles[i]}?${Date.now()}`);
		await client.buttons.set(button.default.id, button.default);
		console.log(chalk.greenBright(`[BUTTON] Reloaded ${(chalk.yellow(buttonFiles[i]))} with button ${(chalk.yellow(button.default.id))}`));
	}
	return buttonFiles.length;
}

export default { loadButtons, reloadButtons };