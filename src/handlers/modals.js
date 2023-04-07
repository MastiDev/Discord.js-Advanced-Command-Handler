import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadModals(client) {
	const modalFiles = readdirSync('./src/interactions/modals').filter(file => file.endsWith('.js'));
	for (let i = 0; i < modalFiles.length; i++) {
		const modal = await import(`../interactions/modals/${modalFiles[i]}`);
		await client.modals.set(modal.default.id, modal.default);
		console.log(chalk.greenBright(`[MODAL] Loaded ${(chalk.yellow(modalFiles[i]))} with modal ${(chalk.yellow(modal.default.id))}`));
	}
}

async function reloadModals(client) {
	client.modals.clear();
	const modalFiles = readdirSync('./src/interactions/modals').filter(file => file.endsWith('.js'));
	for (let i = 0; i < client.modals.size; i++) {
		const modal = await import(`../interactions/modals/${modalFiles[i]}?${Date.now()}`);
		await client.modals.set(modal.default.id, modal.default);
		console.log(chalk.greenBright(`[MODAL] Reloaded ${(chalk.yellow(modalFiles[i]))} with modal ${(chalk.yellow(modal.default.id))}`));
	}
	return modalFiles.length;
}

export default { loadModals, reloadModals };