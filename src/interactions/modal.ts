import { Client, ModalSubmitInteraction } from 'discord.js';

export default {
	id: 'test',
	type: 'modal',
	disabled: false,
	async execute(client: Client, interaction: ModalSubmitInteraction) {
		interaction.reply('Hello World!');
	}
};