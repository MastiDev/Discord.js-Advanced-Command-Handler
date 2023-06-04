import Discord from 'discord.js';
import config from './data/config.js';

import eventHandler from './handlers/events.js';
import messageCommandHandler from './handlers/messageCommands.js';
import slashCommandHandler from './handlers/slashCommands.js';
import modalHandler from './handlers/modals.js';
import buttonHandler from './handlers/buttons.js';
import stringSelectMenuHandler from './handlers/stringSelectMenus.js';
import channelSelectMenuHandler from './handlers/channelSelectMenus.js';
import contextMenus from './handlers/contextMenus.js';
import register from './handlers/register.js';

const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.GuildMembers,
		Discord.GatewayIntentBits.GuildIntegrations,
		Discord.GatewayIntentBits.GuildPresences,
		Discord.GatewayIntentBits.GuildMessageTyping,
		Discord.GatewayIntentBits.DirectMessages,
	],
	allowedMentions: { 
		repliedUser: false // This will allow the bot to ping the user who used the command
	}
});

await client.login(config.bot.token);

client.messageCommands = new Discord.Collection();
client.messageCommandsAliases = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.modals = new Discord.Collection();
client.buttons = new Discord.Collection();
client.stringSelectMenus = new Discord.Collection();
client.channelSelectMenus = new Discord.Collection();
client.contextMenus = new Discord.Collection();

await eventHandler.loadEvents(client);
await messageCommandHandler.loadMessageCommands(client);
await slashCommandHandler.loadSlashCommands(client);
await modalHandler.loadModals(client);
await buttonHandler.loadButtons(client);
await stringSelectMenuHandler.loadStringSelectMenus(client);
await channelSelectMenuHandler.loadChannelSelectMenus(client);
await contextMenus.loadContextMenus(client);
await register.load(client);

process.on('uncaughtException', function (err) {
	console.error(err);
});