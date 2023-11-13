import { Client, UserContextMenuCommandInteraction } from 'discord.js';
import { ContextMenuCommandBuilder } from '@discordjs/builders';

const commandID = 'test';
export default {
	id: commandID,
	type: 'contextMenu',
	disabled: false,
	data: new ContextMenuCommandBuilder()
		.setName('test')
		.setType(2),
	async execute(client: Client, interaction: UserContextMenuCommandInteraction) {
		await interaction.reply('Hello World!');
	}
};