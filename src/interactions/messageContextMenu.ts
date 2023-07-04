import { Client, MessageContextMenuCommandInteraction } from 'discord.js';
import { ContextMenuCommandBuilder } from '@discordjs/builders';

const commandID = 'messageContextMenu';
export default {
	id: commandID,
	type: 'contextMenu',
	disabled: false,
	data: new ContextMenuCommandBuilder()
		.setName('test')
		.setType(3),
	async execute(client: Client, interaction: MessageContextMenuCommandInteraction) {
		interaction.reply('Hello World!');
	}
};