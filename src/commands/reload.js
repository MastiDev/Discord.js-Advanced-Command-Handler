import { SlashCommandBuilder } from '@discordjs/builders';
import slashCommandHandler from '../handlers/slashCommands.js';
import config from '../data/config.js';

export default {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads all commands'),
	async execute(client, interaction) {
		if (!interaction.member.id == config.bot.owner) return interaction.reply('You do not have the permission to use this command!');
		let cmd = await slashCommandHandler.reloadSlashCommands(client);
		interaction.reply(`Reloaded ${cmd} slash commands!`);
	}
};
