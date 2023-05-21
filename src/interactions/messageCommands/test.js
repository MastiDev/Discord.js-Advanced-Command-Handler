export default {
	name: 'hello',
	description: 'Hello world.',
	aliases: ['hey', 'hi'],

	async execute(client, message, args) {
		message.reply('Hello World!');
	}
};