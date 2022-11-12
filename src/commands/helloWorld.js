export default {
	name: 'hello',
	description: 'Hello world.',
	aliases: ['hey', 'hi'],

	async execute(message) {
		message.reply('Hello World!');
	}
};
