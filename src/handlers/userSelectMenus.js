import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadUserSelectMenus(client) {
	client.userSelectMenus.clear();
	let files = 0;
	const userSelectMenuFiles = readdirSync('./src/interactions/userSelectMenus').filter(file => file.endsWith('.js'));
	if (!client.userSelectMenus) return;
	for (let i = 0; i < userSelectMenuFiles.length; i++) {
		const userSelectMenu = await import(`../interactions/userSelectMenus/${userSelectMenuFiles[i]}?${Date.now()}`);
		await client.userSelectMenus.set(userSelectMenu.default.id, userSelectMenu.default);
		console.log(chalk.greenBright(`[USERSELECTMENU] Loaded ${(chalk.yellow(userSelectMenuFiles[i]))} with userSelectMenu ${(chalk.yellow(userSelectMenu.default.id))}`));
		files++;
	}
	const userSelectMenuFolders = readdirSync('./src/interactions/userSelectMenus', { withFileTypes: true }).filter(file => file.isDirectory());
	if (!userSelectMenuFolders) return;
	for (let i = 0; i < userSelectMenuFolders.length; i++) {
		const userSelectMenuFiles = readdirSync(`./src/interactions/userSelectMenus/${userSelectMenuFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < userSelectMenuFiles.length; j++) {
			const userSelectMenu = await import(`../interactions/userSelectMenus/${userSelectMenuFolders[i].name}/${userSelectMenuFiles[j]}?${Date.now()}`);
			await client.userSelectMenus.set(userSelectMenu.default.id, userSelectMenu.default);
			console.log(chalk.greenBright(`[USERSELECTMENU] Loaded ${(chalk.yellow(userSelectMenuFiles[j]))} with userSelectMenu ${(chalk.yellow(userSelectMenu.default.id))}`));
			files++;
		}
	}
	return files;
}

export default { loadUserSelectMenus };