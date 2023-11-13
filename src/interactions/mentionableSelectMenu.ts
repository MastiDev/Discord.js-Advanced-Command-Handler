import { Client, MentionableSelectMenuInteraction } from 'discord.js';

export default {
	id: 'mentionableSelectMenu',
	type: 'mentionableSelectMenu',
	disabled: false,
	async execute(client: Client, interaction: MentionableSelectMenuInteraction) {
		await interaction.reply('Hello World!');
	}
};