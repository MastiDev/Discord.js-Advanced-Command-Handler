import { Client, GatewayIntentBits, Collection } from 'discord.js';
import config from './data/config.js';

import loadEvents from './handlers/events.js';
import loadInteractions from './handlers/handler.js';
import registerApplicationCommands from './handlers/application.js';
import { loadCronJobs } from './handlers/cronjobs.js';

declare module 'discord.js' {
	interface Client {
		interaction: Collection<string, object>;
	}
}

const client = new Client({
	intents: [
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
	],
	allowedMentions: { 
		repliedUser: false // This will allow the bot to ping the user who used the command
	}
});

await client.login(config.bot.token);

client.interaction = new Collection();

await loadEvents(client);
await loadInteractions('./dist/interactions', client);
await registerApplicationCommands(client);
await loadCronJobs('./dist/cron', client);

process.on('uncaughtException', function (err) {
	console.error(err);
});