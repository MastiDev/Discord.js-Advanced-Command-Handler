import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadChannelSelectMenus(client) {
	client.channelSelectMenus.clear();
	let files = 0;
	const channelSelectMenuFiles = readdirSync('./src/interactions/channelSelectMenus').filter(file => file.endsWith('.js'));
	if (!client.channelSelectMenus) return;
	for (let i = 0; i < channelSelectMenuFiles.length; i++) {
		const channelSelectMenu = await import(`../interactions/channelSelectMenus/${channelSelectMenuFiles[i]}?${Date.now()}`);
		await client.channelSelectMenus.set(channelSelectMenu.default.id, channelSelectMenu.default);
		console.log(chalk.greenBright(`[CHANNELSELECTMENU] Loaded ${(chalk.yellow(channelSelectMenuFiles[i]))} with channelSelectMenu ${(chalk.yellow(channelSelectMenu.default.id))}`));
		files++;
	}
	const channelSelectMenuFolders = readdirSync('./src/interactions/channelSelectMenus', { withFileTypes: true }).filter(file => file.isDirectory());
	if (!channelSelectMenuFolders) return;
	for (let i = 0; i < channelSelectMenuFolders.length; i++) {
		const channelSelectMenuFiles = readdirSync(`./src/interactions/channelSelectMenus/${channelSelectMenuFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < channelSelectMenuFiles.length; j++) {
			const channelSelectMenu = await import(`../interactions/channelSelectMenus/${channelSelectMenuFolders[i].name}/${channelSelectMenuFiles[j]}?${Date.now()}`);
			await client.channelSelectMenus.set(channelSelectMenu.default.id, channelSelectMenu.default);
			console.log(chalk.greenBright(`[CHANNELSELECTMENU] Loaded ${(chalk.yellow(channelSelectMenuFiles[j]))} with channelSelectMenu ${(chalk.yellow(channelSelectMenu.default.id))}`));
			files++;
		}
	}
	return files;
}

export default { loadChannelSelectMenus };