import { readdirSync } from 'fs';
import chalk from 'chalk';

async function loadMentionableSelectMenus(client) {
	client.mentionableSelectMenus.clear();
	let files = 0;
	const mentionableSelectMenuFiles = readdirSync('./src/interactions/mentionableSelectMenus').filter(file => file.endsWith('.js'));
	if (!client.mentionableSelectMenus) return;
	for (let i = 0; i < mentionableSelectMenuFiles.length; i++) {
		const mentionableSelectMenu = await import(`../interactions/mentionableSelectMenus/${mentionableSelectMenuFiles[i]}?${Date.now()}`);
		await client.mentionableSelectMenus.set(mentionableSelectMenu.default.id, mentionableSelectMenu.default);
		console.log(chalk.greenBright(`[mentionableSelectMenu] Loaded ${(chalk.yellow(mentionableSelectMenuFiles[i]))} with mentionableSelectMenu ${(chalk.yellow(mentionableSelectMenu.default.id))}`));
		files++;
	}
	const mentionableSelectMenuFolders = readdirSync('./src/interactions/mentionableSelectMenus', { withFileTypes: true }).filter(file => file.isDirectory());
	if (!mentionableSelectMenuFolders) return;
	for (let i = 0; i < mentionableSelectMenuFolders.length; i++) {
		const mentionableSelectMenuFiles = readdirSync(`./src/interactions/mentionableSelectMenus/${mentionableSelectMenuFolders[i].name}`).filter(file => file.endsWith('.js'));
		for (let j = 0; j < mentionableSelectMenuFiles.length; j++) {
			const mentionableSelectMenu = await import(`../interactions/mentionableSelectMenus/${mentionableSelectMenuFolders[i].name}/${mentionableSelectMenuFiles[j]}?${Date.now()}`);
			await client.mentionableSelectMenus.set(mentionableSelectMenu.default.id, mentionableSelectMenu.default);
			console.log(chalk.greenBright(`[mentionableSelectMenu] Loaded ${(chalk.yellow(mentionableSelectMenuFiles[j]))} with mentionableSelectMenu ${(chalk.yellow(mentionableSelectMenu.default.id))}`));
			files++;
		}
	}
	return files;
}

export default { loadMentionableSelectMenus };