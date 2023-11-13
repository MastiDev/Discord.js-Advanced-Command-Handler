import { Client, RoleSelectMenuInteraction } from 'discord.js';

export default {
	id: 'test',
	type: 'roleSelectMenu',
	disabled: false,
	async execute(client: Client, interaction: RoleSelectMenuInteraction) {
		await interaction.reply('Hello World!');
	}
};