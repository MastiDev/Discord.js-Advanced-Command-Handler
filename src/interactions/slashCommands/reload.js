import config from '../../data/config.js';
import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';
import chalk from 'chalk';

import buttonHandler from '../../handlers/buttons.js';
import contextMenusHandler from '../../handlers/contextMenus.js';
import messageCommandsHandler from '../../handlers/messageCommands.js';
import modalsHandler from '../../handlers/modals.js';
import selectMenusHandler from '../../handlers/selectMenus.js';
import slashCommandsHandler from '../../handlers/slashCommands.js';

export default {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads all commands'),
	async execute(client, interaction) {
		if (!interaction.member.id == config.bot.owner) return interaction.reply('You do not have the permission to use this command!');

		console.log(chalk.red('[RELOAD] ')  + chalk.yellow('Started reloading everything!'));

		let buttons = await buttonHandler.loadButtons(client);
		let contextMenus = await contextMenusHandler.loadContextMenus(client);
		let messageCommands = await messageCommandsHandler.loadMessageCommands(client);
		let modals = await modalsHandler.loadModals(client);
		let selectMenus = await selectMenusHandler.loadSelectMenus(client);
		let slashCommands = await slashCommandsHandler.loadSlashCommands(client);

		let embed = new EmbedBuilder();
		embed.setTitle('Successfully reloaded!');
		embed.addFields(
			{ name: 'Slash Commands', value: `${slashCommands}`, inline: true },
			{ name: 'Message Commands', value: `${messageCommands}`, inline: true },
			{ name: 'Buttons', value: `${buttons}`, inline: true },
			{ name: 'Select Menus', value: `${selectMenus}`, inline: true },
			{ name: 'Context Menus', value: `${contextMenus}`, inline: true },
			{ name: 'Modals', value: `${modals}`, inline: true },
		);

		await interaction.reply({ embeds: [embed] });
	}
};