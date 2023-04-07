import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadContextMenus(client) {
	const contextMenus = readdirSync('./src/interactions/contextMenus').filter(file => file.endsWith('.js'));
	for (let i = 0; i < contextMenus.length; i++) {
		const menus = await import(`../interactions/contextMenus/${contextMenus[i]}`);
		client.contextMenus.set(menus.default.data.toJSON().name, menus.default);
		console.log(chalk.greenBright(`[CONTEXTMENU] Loaded ${chalk.yellow(contextMenus[i])} with command ${chalk.yellow(menus.default.data.toJSON().name)}`));
	}
}

async function reloadContextMenus(client) {
	client.contextMenus.clear();
	const contextMenus = readdirSync('./src/interactions/contextMenus').filter(file => file.endsWith('.js'));
	for (let i = 0; i < contextMenus.length; i++) {
		const menus = await import(`../interactions/contextMenus/${contextMenus[i]}?${Date.now()}`);
		client.contextMenus.set(menus.default.data.toJSON().name, menus.default);
		console.log(chalk.greenBright(`[CONTEXTMENU] Reloaded ${chalk.yellow(contextMenus[i])} with command ${chalk.yellow(menus.default.data.toJSON().name)}`));
	}
	return contextMenus.length;
}

export default { loadContextMenus, reloadContextMenus };