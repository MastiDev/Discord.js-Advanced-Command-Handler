export default {
	name: 'hello2',
	description: 'Hello world.',
	aliases: ['hey2', 'hi2'],

	async execute(client, message, args) {
		message.reply('Hello World!');
	}
};