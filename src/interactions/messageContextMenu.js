import { ContextMenuCommandBuilder } from '@discordjs/builders';

let commandID = 'messageContextMenu';
export default {
	id: commandID,
	type: 'contextMenu',
	disabled: false,
	data: new ContextMenuCommandBuilder()
		.setName('test')
		.setType(3),
	async execute(client, interaction) {
		interaction.reply('Hello World!');
	}
};