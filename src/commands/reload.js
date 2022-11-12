import commandHandler from '../handlers/commands.js';
import slashCommandHandler from '../handlers/slashCommands.js';
import config from '../data/config.js';

export default {
	name: 'reload',
	description: 'Reloads all commands',
	aliases: ['rl'],

	async execute(message, args, client) {
		if (!message.member.id == config.bot.owner) return message.reply('You do not have the permission to use this command!');
		let cmd = await commandHandler.reloadCommands(client);
		let cmds = await slashCommandHandler.reloadSlashCommands(client);
		message.reply(`Reloaded ${cmd} commands and ${cmds} slash commands!`);
	}
};
