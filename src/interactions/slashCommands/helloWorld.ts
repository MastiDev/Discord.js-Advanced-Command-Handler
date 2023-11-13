import { Client, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const commandID = 'hello';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('Replies with Hello World!'),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		await interaction.reply('Hello World!');
	}
};