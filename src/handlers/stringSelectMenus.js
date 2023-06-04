import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadStringSelectMenus(client) {
	client.stringSelectMenus.clear();
	let files = 0;
	const stringSelectMenuFiles = readdirSync('./src/interactions/stringSelectMenus').filter(file => file.endsWith('.js'));
	if (!client.stringSelectMenus) return;
	for (let i = 0; i < stringSelectMenuFiles.length; i++) {
		const stringSelectMenu = await import(`../interactions/stringSelectMenus/${stringSelectMenuFiles[i]}?${Date.now()}`);
		await client.stringSelectMenus.set(stringSelectMenu.default.id, stringSelectMenu.default);
		console.log(chalk.greenBright(`[STRINGSELECTMENU] Loaded ${(chalk.yellow(stringSelectMenuFiles[i]))} with stringSelectMenu ${(chalk.yellow(stringSelectMenu.default.id))}`));
		files++;
	}
	const stringSelectMenuFolders = readdirSync('./src/interactions/stringSelectMenus', { withFileTypes: true }).filter(file => file.isDirectory());
	if (!stringSelectMenuFolders) return;
	for (let i = 0; i < stringSelectMenuFolders.length; i++) {
		const stringSelectMenuFiles = readdirSync(`./src/interactions/stringSelectMenus/${stringSelectMenuFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < stringSelectMenuFiles.length; j++) {
			const stringSelectMenu = await import(`../interactions/stringSelectMenus/${selectMenuFolders[i].name}/${selectMenuFiles[j]}?${Date.now()}`);
			await client.stringSelectMenus.set(stringSelectMenu.default.id, stringSelectMenu.default);
			console.log(chalk.greenBright(`[STRINGSELECTMENU] Loaded ${(chalk.yellow(stringSelectMenuFiles[j]))} with stringSelectMenu ${(chalk.yellow(stringSelectMenu.default.id))}`));
			files++;
		}
	}
	return files;
}

export default { loadStringSelectMenus };