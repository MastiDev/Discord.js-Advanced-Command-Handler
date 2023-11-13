import { Client, ButtonInteraction } from 'discord.js';

export default {
	id: 'button',
	type: 'button',
	disabled: false,
	async execute(client: Client, interaction: ButtonInteraction) {
		await interaction.reply('Hello World!');
	}
};