import commandHandler from '../handlers/commands.js';

export default {
	name: 'reload',
	description: 'Reloads all commands',
	aliases: [],

	async execute(message, args, client) {
		try {
			let cmd = await commandHandler.reloadCommands(client);
			message.reply(`${cmd} commands have been reloaded!`);
		} catch (error) {
			console.log(error);
		}
	}
};
