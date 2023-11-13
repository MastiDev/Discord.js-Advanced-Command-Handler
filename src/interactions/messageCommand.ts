import { Client, Message } from 'discord.js';

export default {
	id: 'hello',
	type: 'messageCommand',
	disabled: false,
	aliases: ['hey', 'hi'],
	async execute(client: Client, message: Message, args: string[]) {
		await message.reply('Hello World! ' + args.join(' '));
	}
};