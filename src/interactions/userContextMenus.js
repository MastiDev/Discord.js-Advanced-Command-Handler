import { ContextMenuCommandBuilder } from '@discordjs/builders';

let commandID = 'test';
export default {
	id: commandID,
	type: 'contextMenu',
	disabled: false,
	data: new ContextMenuCommandBuilder()
		.setName('test')
		.setType(2),
	async execute(client, interaction) {
		interaction.reply('Hello World!');
	}
};