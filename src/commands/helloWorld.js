export default {
	name: 'hello',
	description: 'Hello world.',
	aliases: ['hey', 'hi'],

	async execute(message) {
		try {
			message.reply('Hello World!');
		} catch (error) {
			console.log(error);
		}
	}
};
