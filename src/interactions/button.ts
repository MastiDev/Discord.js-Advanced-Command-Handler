import { Client, ButtonInteraction } from 'discord.js';

export default {
	id: 'button',
	type: 'button',
	disabled: false,
	async execute(client: Client, interaction: ButtonInteraction) {
		interaction.reply('Hello World!');
	}
};