import Discord from 'discord.js';
import config from './data/config.js';

import commandHanderler from './handlers/commands.js';
import eventHandler from './handlers/events.js';

console.clear();

const client = new Discord.Client({intents: 3276799});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

await commandHanderler.loadCommands(client);

client.login(`${config.token}`);