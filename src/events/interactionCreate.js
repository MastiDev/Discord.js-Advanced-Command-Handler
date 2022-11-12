export default {
	event: 'interactionCreate',
	async execute(client, interaction) {
		try { 
			if (!interaction.isCommand()) return;
			const command = client.slashCommands.get(interaction.commandName);
			if (!command) return;
			await command.execute(client, interaction);
		} catch (error) {
			return console.log(error);
		}
	}
};