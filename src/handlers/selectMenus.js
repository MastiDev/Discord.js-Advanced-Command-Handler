import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadSelectMenus(client) {
	client.selectMenus.clear();
	const selectMenuFiles = readdirSync('./src/interactions/selectMenus').filter(file => file.endsWith('.js'));
	for (let i = 0; i < selectMenuFiles.length; i++) {
		const selectMenu = await import(`../interactions/selectMenus/${selectMenuFiles[i]}?${Date.now()}`);
		await client.selectMenus.set(selectMenu.default.id, selectMenu.default);
		console.log(chalk.greenBright(`[SELECTMENU] Loaded ${(chalk.yellow(selectMenuFiles[i]))} with selectMenu ${(chalk.yellow(selectMenu.default.id))}`));
	}
	const selectMenuFolders = readdirSync('./src/interactions/selectMenus', { withFileTypes: true }).filter(file => file.isDirectory());
	for (let i = 0; i < selectMenuFolders.length; i++) {
		const selectMenuFiles = readdirSync(`./src/interactions/selectMenus/${selectMenuFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < selectMenuFiles.length; j++) {
			const selectMenu = await import(`../interactions/selectMenus/${selectMenuFolders[i].name}/${selectMenuFiles[j]}?${Date.now()}`);
			await client.selectMenus.set(selectMenu.default.id, selectMenu.default);
			console.log(chalk.greenBright(`[SELECTMENU] Loaded ${(chalk.yellow(selectMenuFiles[j]))} with selectMenu ${(chalk.yellow(selectMenu.default.id))}`));
		}
	}
}

export default { loadSelectMenus };