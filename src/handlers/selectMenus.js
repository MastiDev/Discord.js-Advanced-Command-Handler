import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadSelectMenus(client) {
	const selectMenuFiles = readdirSync('./src/interactions/selectMenus').filter(file => file.endsWith('.js'));
	for (let i = 0; i < selectMenuFiles.length; i++) {
		const selectMenu = await import(`../interactions/selectMenus/${selectMenuFiles[i]}`);
		await client.selectMenus.set(selectMenu.default.id, selectMenu.default);
		console.log(chalk.greenBright(`[SELECTMENU] Loaded ${(chalk.yellow(selectMenuFiles[i]))} with selectMenu ${(chalk.yellow(selectMenu.default.id))}`));
	}
}

async function reloadSelectMenus(client) {
	client.selectMenus.clear();
	const selectMenuFiles = readdirSync('./src/interactions/selectMenus').filter(file => file.endsWith('.js'));
	for (let i = 0; i < selectMenuFiles.length; i++) {
		const selectMenu = await import(`../interactions/selectMenus/${selectMenuFiles[i]}?${Date.now()}`);
		await client.selectMenus.set(selectMenu.default.id, selectMenu.default);
		console.log(chalk.greenBright(`[SELECTMENU] Reloaded ${(chalk.yellow(selectMenuFiles[i]))} with selectMenu ${(chalk.yellow(selectMenu.default.id))}`));
	}
	return selectMenuFiles.length;
}

export default { loadSelectMenus, reloadSelectMenus };