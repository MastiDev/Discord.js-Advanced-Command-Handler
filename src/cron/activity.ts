import { Client } from 'discord.js';
import chalk from 'chalk';

export default {
	cron: '*/15 * * * * *',
	async execute(client: Client) {
		const activityList = [
			`with ${client.guilds.cache.size} servers`,
			`with ${client.users.cache.size} users`,
			`with ${client.channels.cache.size} channels`,
			`with ${client.emojis.cache.size} emojis`,
		];
    
		const activity = activityList[Math.floor(Math.random() * activityList.length)];

		if(!client.user) return console.log(chalk.red('[ERROR] ') + chalk.yellow('Client user is undefined.'));

		client.user.setActivity(activity, {
			name: activity,
			type: 1
		});
	}
};