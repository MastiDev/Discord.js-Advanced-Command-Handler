export default {
	id: 'test',
	type: 'modal',
	disabled: false,
	async execute(client, interaction) {
		interaction.reply('Hello World!');
	}
};