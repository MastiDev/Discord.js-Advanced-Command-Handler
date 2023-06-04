export default {
	event: 'interactionCreate',
	async execute(client, interaction) {
		try {

			const interactionType = (() => {
				if (interaction.isContextMenuCommand()) return 'contextMenu';
				if (interaction.isMessageContextMenuCommand()) return 'messageContextMenu';
				if (interaction.isUserContextMenuCommand()) return 'userContextMenu';
				if (interaction.isCommand()) return 'slashCommand';
				if (interaction.isModalSubmit()) return 'modal';
				if (interaction.isButton()) return 'button';
				if (interaction.isStringSelectMenu()) return 'stringSelectMenu';
				if (interaction.isChannelSelectMenu()) return 'channelSelectMenu';
				if (interaction.isMentionableSelectMenu()) return 'mentionableSelectMenu';
				if (interaction.isRoleSelectMenu()) return 'roleSelectMenu';
				if (interaction.isUserSelectMenu()) return 'userSelectMenu';
			})();

			let action = client.interaction.get(`${interactionType}-${interaction.customId || interaction.commandName}`);
			if (!action) return;
			try {
				action.execute(client, interaction);
			} catch (error) {
				interaction.reply({ content: 'There was an error while executing this context menu!', ephemeral: true });
				console.log(error);
			}

		} catch (error) {
			return console.log(error);
		}
	}
};