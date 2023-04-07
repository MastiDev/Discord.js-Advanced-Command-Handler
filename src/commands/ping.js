import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping!'),
	async execute(client, interaction) {
		interaction.reply('Pong!');
	}
};