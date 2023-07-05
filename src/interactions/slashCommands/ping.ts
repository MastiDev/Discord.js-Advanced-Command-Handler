import { Client, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const commandID = 'ping';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('Ping!'),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		interaction.reply('Pong!');
	}
};