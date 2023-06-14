export default {
	cron: '*/15 * * * * *',
	async execute(client) {
		let activityList = [
			`with ${client.guilds.cache.size} servers`,
			`with ${client.users.cache.size} users`,
			`with ${client.channels.cache.size} channels`,
			`with ${client.emojis.cache.size} emojis`,
		];
    
		let activity = activityList[Math.floor(Math.random() * activityList.length)];
		client.user.setActivity(activity, {
			name: activity,
			type: 1
		});
	}
};