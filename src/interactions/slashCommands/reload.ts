import config from '../../data/config.js';
import { Client, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';
import chalk from 'chalk';

import loadInteractions from '../../handlers/handler.js';
import registerApplicationCommands from '../../handlers/application.js';

const commandID = 'reload';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('Reloads all commands'),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		if (interaction.user.id !== config.bot.owner) return interaction.reply('You do not have the permission to use this command!');

		console.log(chalk.red('[RELOAD] ')  + chalk.yellow('Reloading...'));

		client.interaction.clear();

		await loadInteractions('./dist/interactions', client);
		await registerApplicationCommands(client);


		const embed = new EmbedBuilder();
		embed.setTitle('Successfully reloaded!');
		await interaction.reply({ embeds: [embed] });
	}
};