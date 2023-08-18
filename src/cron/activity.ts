import { Client, ActivityType } from 'discord.js';
import chalk from 'chalk';

export default {
	cron: '*/10 * * * * *',
	async execute(client: Client) {
		const activityList: [ActivityType, string][] = [
			[ActivityType.Playing, `${client.users.cache.size} users`],
			[ActivityType.Playing, `${client.guilds.cache.size} servers`],
			[ActivityType.Custom, 'Serving you!'],
		];
    
		const activity = activityList[Math.floor(Math.random() * activityList.length)];
		if(!client.user) return console.log(chalk.red('[ERROR] ') + chalk.yellow('Client user is undefined.'));

		if(activity[0] === ActivityType.Custom) client.user.setActivity(activity[1].toString(), { type: ActivityType.Custom });
		else client.user.setActivity(activity[1].toString(), { type: activity[0] });
	}
};