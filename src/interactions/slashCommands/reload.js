import config from '../../data/config.js';
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';
import chalk from 'chalk';

import loadEvents from '../../handlers/events.js';
import loadInteractions from '../../handlers/handler.js';
import registerApplicationCommands from '../../handlers/application.js';

let commandID = 'reload';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('Reloads all commands'),
	async execute(client, interaction) {
		if (!interaction.member.id == config.bot.owner) return interaction.reply('You do not have the permission to use this command!');

		console.log(chalk.red('[RELOAD] ')  + chalk.yellow('Reloading...'));

		await loadEvents(client);
		await loadInteractions('./src/interactions', client);
		await registerApplicationCommands(client);


		let embed = new EmbedBuilder();
		embed.setTitle('Successfully reloaded!');
		await interaction.reply({ embeds: [embed] });
	}
};