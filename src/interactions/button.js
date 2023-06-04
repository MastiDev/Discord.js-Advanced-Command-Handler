export default {
	id: 'button',
	type: 'button',
	disabled: false,
	async execute(client, interaction) {
		interaction.reply('Hello World!');
	}
};