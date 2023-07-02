import { Client } from 'discord.js';
import fs from 'fs';
import cron from 'node-cron';
import chalk from 'chalk';

export async function loadCronJobs(folderPath: string, client: Client) {
	let files = fs.readdirSync(folderPath);

	for (let i = 0; i < files.length; i++) {
		files[i] = files[i].replace('.ts', '.js');
		folderPath = folderPath.replace('src/', '');
		let cronjob = await import (`../${folderPath}/${files[i]}`);
		cron.schedule(cronjob.default.cron, () => cronjob.default.execute(client));
		console.log(chalk.greenBright(`[CRONJOB] Loaded ${(chalk.yellow(files[i]))}`));
	}
}