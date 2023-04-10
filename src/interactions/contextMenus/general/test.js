import { ContextMenuCommandBuilder } from '@discordjs/builders';

export default {
	data: new ContextMenuCommandBuilder()
		.setName('test')
		.setType(2),
	async execute(client, interaction) {
		interaction.reply('Hello World!');
	}
};