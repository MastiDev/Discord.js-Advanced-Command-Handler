import { Client, UserSelectMenuInteraction} from 'discord.js';

export default {
	id: 'test',
	type: 'userSelectMenu',
	disabled: false,
	async execute(client: Client, interaction: UserSelectMenuInteraction) {
		interaction.reply('Hello World!');
	}
};