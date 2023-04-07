import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Replies with Hello World!'),
	async execute(client, interaction) {
		interaction.reply('Hello World!');
	}
};