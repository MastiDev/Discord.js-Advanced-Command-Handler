import { SlashCommandBuilder } from '@discordjs/builders';

let commandID = 'ping';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new SlashCommandBuilder()
		.setName(commandID)
		.setDescription('Ping!'),
	async execute(client, interaction) {
		interaction.reply('Pong!');
	}
};