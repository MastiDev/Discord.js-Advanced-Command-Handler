import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadContextMenus(client) {
	client.contextMenus.clear();
	let files = 0;
	const contextMenus = readdirSync('./src/interactions/contextMenus').filter(file => file.endsWith('.js'));
	if (!contextMenus) return;
	for (let i = 0; i < contextMenus.length; i++) {
		const menus = await import(`../interactions/contextMenus/${contextMenus[i]}?${Date.now()}`);
		client.contextMenus.set(menus.default.data.toJSON().name, menus.default);
		console.log(chalk.greenBright(`[CONTEXTMENU] Loaded ${chalk.yellow(contextMenus[i])} with command ${chalk.yellow(menus.default.data.toJSON().name)}`));
		files++;
	}
	const contextMenuFolders = readdirSync('./src/interactions/contextMenus', { withFileTypes: true }).filter(file => file.isDirectory());
	if (!contextMenuFolders) return;
	for (let i = 0; i < contextMenuFolders.length; i++) {
		const contextMenus = readdirSync(`./src/interactions/contextMenus/${contextMenuFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < contextMenus.length; j++) {
			const menus = await import(`../interactions/contextMenus/${contextMenuFolders[i].name}/${contextMenus[j]}`);
			client.contextMenus.set(menus.default.data.toJSON().name, menus.default);
			console.log(chalk.greenBright(`[CONTEXTMENU] Loaded ${chalk.yellow(contextMenus[j])} with command ${chalk.yellow(menus.default.data.toJSON().name)}`));
			files++;
		}
	}
	return files;
}

export default { loadContextMenus };