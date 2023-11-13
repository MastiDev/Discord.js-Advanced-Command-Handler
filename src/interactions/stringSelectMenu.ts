import { Client, StringSelectMenuInteraction } from 'discord.js';

export default {
	id: 'stringSelectMenu',
	type: 'stringSelectMenu',
	disabled: false,
	async execute(client: Client, interaction: StringSelectMenuInteraction) {
		await interaction.reply('Hello World!');
	}
};