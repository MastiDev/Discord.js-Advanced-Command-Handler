import commandHandler from '../handlers/commands.js';
import config from '../data/config.js';

export default {
	name: 'reload',
	description: 'Reloads all commands',
	aliases: ['rl'],

	async execute(message, args, client) {
		try {
			if (!message.member.id == `${config.bot.eval}`) return message.reply('You do not have the permission to use this command!');
			let cmd = await commandHandler.reloadCommands(client);
			message.reply(`${cmd} commands have been reloaded!`);
		} catch (error) {
			console.log(error);
		}
	}
};
