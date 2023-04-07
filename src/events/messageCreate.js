export default {
	event: 'messageCreate',
	async execute(client, message) {
		try {
			if (message.author.bot) return;

		} catch (error) {
			console.log(error);
		}
	}
};