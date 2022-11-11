import Discord from 'discord.js';
import config from './data/config.js';

import commandHandler from './handlers/commands.js';
import eventHandler from './handlers/events.js';

console.clear();

const client = new Discord.Client({
	intents: 3276799,
	allowedMentions: { 
		repliedUser: true 
	},
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

await commandHandler.loadCommands(client);
await eventHandler.loadEvents(client);

process.on('uncaughtException', function (err) {
	console.error(err);
});

client.login(`${config.token}`);