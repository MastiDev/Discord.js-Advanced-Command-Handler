import fs from 'fs';
import cron from 'node-cron';

export async function loadCronJobs(folderPath, client) {
	let files = fs.readdirSync(folderPath);

	for (let i = 0; i < files.length; i++) {
		folderPath = folderPath.replace('src/', '');
		let cronjob = await import (`../${folderPath}/${files[i]}`);
		cron.schedule(cronjob.default.cron, () => cronjob.default.execute(client));
	}
}