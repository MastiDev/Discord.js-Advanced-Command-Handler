export default {
	id: 'hello',
	type: 'messageCommand',
	disabled: false,
	aliases: ['hey', 'hi'],
	async execute(client, message, args) {
		message.reply('Hello World!');
	}
};