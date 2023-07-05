import { Client, ChannelSelectMenuInteraction } from 'discord.js';

export default {
	id: 'channelSelectMenu',
	type: 'channelSelectMenu',
	disabled: false,
	async execute(client: Client, interaction: ChannelSelectMenuInteraction) {
		interaction.reply('Hello World!');
	}
};