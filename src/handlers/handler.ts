import fs from 'fs';
import chalk from 'chalk';
import { Client } from 'discord.js';

async function loadInteractions(folderPath: string, client: Client) {
	try {
		const files = fs.readdirSync(folderPath);

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const filePath = folderPath + '/' + file;
			const stats = fs.statSync(filePath);

			if (stats.isDirectory()) {
				await loadInteractions(filePath, client);
			} else {
				const interactionPath = '.' + filePath;
				const interaction = await import(`../${interactionPath}?${Date.now()}`);

				if (interaction.default.disabled === true) return;
				if (interaction.default.type === 'messageCommand') {
					client.interaction.set(`messageCommand-${interaction.default.id}`, interaction.default);
					console.log(chalk.greenBright(`[${interaction.default.type.toUpperCase()}] Successfully Loaded ${(chalk.yellow(file))} ${(chalk.yellow(interaction.default.id))}`));
					if (interaction.default.aliases) {
						for (let i = 0; i < interaction.default.aliases.length; i++) {
							client.interaction.set(`messageCommand-${interaction.default.aliases[i]}`, interaction.default);
						}
					}
				} else {
					client.interaction.set(`${interaction.default.type}-${interaction.default.id}`, interaction.default);
					console.log(chalk.greenBright(`[${interaction.default.type.toUpperCase()}] Successfully Loaded ${(chalk.yellow(file))} ${(chalk.yellow(interaction.default.id))}`));
				}
			}
		}
	} catch (err) {
		console.error(err);
	}
}

export default loadInteractions;