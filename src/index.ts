import Discord from 'discord.js';
import config from './data/config.js';

import loadEvents from './handlers/events.js';
import loadInteractions from './handlers/handler.js';
import registerApplicationCommands from './handlers/application.js';
import { loadCronJobs } from './handlers/cronjobs.js';

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

client.interaction = new Discord.Collection();

await loadEvents(client);
await loadInteractions('./dist/interactions', client);
await registerApplicationCommands(client);
await loadCronJobs('./dist/cron', client);

process.on('uncaughtException', function (err) {
	console.error(err);
});