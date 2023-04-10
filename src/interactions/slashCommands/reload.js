import config from '../../data/config.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import slashCommandHandler from '../../handlers/slashCommands.js';
import modalHandler from '../../handlers/modals.js';
import buttonHandler from '../../handlers/buttons.js';
import selectMenuHandler from '../../handlers/selectMenus.js';
import contextMenusHandler from '../../handlers/contextMenus.js';
import register from '../../handlers/register.js';


export default {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads all commands'),
	async execute(client, interaction) {
		if (!interaction.member.id == config.bot.owner) return interaction.reply('You do not have the permission to use this command!');
		let cmds = await slashCommandHandler.reloadSlashCommands(client);
		let modals = await modalHandler.reloadModals(client);
		let buttons = await buttonHandler.reloadButtons(client);
		let selectMenus = await selectMenuHandler.reloadSelectMenus(client);
		let contextMenus = await contextMenusHandler.reloadContextMenus(client);
		await register.load(client);

		interaction.reply(`Reloaded ${cmds} slash commands, ${modals} modals, ${buttons} buttons, and ${selectMenus} select menus, and ${contextMenus} context menus!`);
	}
};
