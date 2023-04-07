export default {
	event: 'interactionCreate',
	async execute(client, interaction) {
		try { 
			if (interaction.isCommand()) {
				const command = client.slashCommands.get(interaction.commandName);
				if (!command) return;
				try {
					command.execute(client, interaction);
				} catch (error) {
					interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
					console.log(error);
				}
			}

			if (interaction.isModalSubmit()) {
				const modal = client.modals.get(interaction.customId);
				if (!modal) return;
				try {
					modal.execute(client, interaction);
				} catch (error) {
					interaction.reply({ content: 'There was an error while executing this modal!', ephemeral: true });
					console.log(error);
				}
			}

			if (interaction.isButton()) {
				const button = client.buttons.get(interaction.customId);
				if (!button) return;
				try {
					button.execute(client, interaction);
				} catch (error) {
					interaction.reply({ content: 'There was an error while executing this button!', ephemeral: true });
					console.log(error);
				}
			}

			if (interaction.isStringSelectMenu()) {
				const selectMenu = client.selectMenus.get(interaction.customId);
				if (!selectMenu) return;
				try {
					selectMenu.execute(client, interaction);
				} catch (error) {
					interaction.reply({ content: 'There was an error while executing this select menu!', ephemeral: true });
					console.log(error);
				}
			}
			
		} catch (error) {
			return console.log(error);
		}
	}
};