export default {
	event: 'ready',
	async execute(client) {
		try {
			console.log(`Logged in as ${client.user.tag}`);
		} catch (error) {
			return console.log(error);
		}
	}
};