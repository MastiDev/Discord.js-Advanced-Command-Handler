import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadRoleSelectMenus(client) {
	client.roleSelectMenus.clear();
	let files = 0;
	const roleSelectMenuFiles = readdirSync('./src/interactions/roleSelectMenus').filter(file => file.endsWith('.js'));
	if (!client.roleSelectMenus) return;
	for (let i = 0; i < roleSelectMenuFiles.length; i++) {
		const roleSelectMenu = await import(`../interactions/roleSelectMenus/${roleSelectMenuFiles[i]}?${Date.now()}`);
		await client.roleSelectMenus.set(roleSelectMenu.default.id, roleSelectMenu.default);
		console.log(chalk.greenBright(`[roleSelectMenu] Loaded ${(chalk.yellow(roleSelectMenuFiles[i]))} with roleSelectMenu ${(chalk.yellow(roleSelectMenu.default.id))}`));
		files++;
	}
	const roleSelectMenuFolders = readdirSync('./src/interactions/roleSelectMenus', { withFileTypes: true }).filter(file => file.isDirectory());
	if (!roleSelectMenuFolders) return;
	for (let i = 0; i < roleSelectMenuFolders.length; i++) {
		const roleSelectMenuFiles = readdirSync(`./src/interactions/roleSelectMenus/${roleSelectMenuFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < roleSelectMenuFiles.length; j++) {
			const roleSelectMenu = await import(`../interactions/roleSelectMenus/${roleSelectMenuFolders[i].name}/${roleSelectMenuFiles[j]}?${Date.now()}`);
			await client.roleSelectMenus.set(roleSelectMenu.default.id, roleSelectMenu.default);
			console.log(chalk.greenBright(`[roleSelectMenu] Loaded ${(chalk.yellow(roleSelectMenuFiles[j]))} with roleSelectMenu ${(chalk.yellow(roleSelectMenu.default.id))}`));
			files++;
		}
	}
	return files;
}

export default { loadRoleSelectMenus };