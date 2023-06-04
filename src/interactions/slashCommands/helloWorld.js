import Discord from 'discord.js';

let commandID = 'hello';
export default {
	id: commandID,
	type: 'slashCommand',
	disabled: false,
	data: new Discord.SlashCommandBuilder()
		.setName(commandID)
		.setDescription('Replies with Hello World!'),
	async execute(client, interaction) {
		interaction.reply('Hello World!');
	}
};