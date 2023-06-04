export default {
	id: 'test',
	type: 'userSelectMenu',
	disabled: false,
	async execute(client, interaction) {
		interaction.reply('Hello World!');
	}
};