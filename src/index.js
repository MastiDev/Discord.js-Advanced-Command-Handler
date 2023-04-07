import Discord from 'discord.js';
import config from './data/config.js';

import eventHandler from './handlers/events.js';
import slashCommandHandler from './handlers/slashCommands.js';

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

client.aliases = new Discord.Collection();
client.slashCommands = new Discord.Collection();

await eventHandler.loadEvents(client);
await slashCommandHandler.loadSlashCommands(client);

process.on('uncaughtException', function (err) {
	console.error(err);
});