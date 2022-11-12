export default {
	event: 'interactionCreate',
	async execute(client, interaction) {
		try { 
			if (!interaction.isCommand()) return;
			const command = client.slashCommands.get(interaction.commandName);
			if (!command) return;
			try {
				command.execute(client, interaction);
			} catch (error) {
				interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				console.log(error);
			}
		} catch (error) {
			return console.log(error);
		}
	}
};