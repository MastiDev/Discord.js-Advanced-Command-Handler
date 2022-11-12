import Discord from 'discord.js';
import config from './data/config.js';
import chalk from 'chalk';
import util from 'util';
import mysql from 'mysql2';

import commandHandler from './handlers/commands.js';
import eventHandler from './handlers/events.js';
import slashCommandHandler from './handlers/slashCommands.js';

console.clear();

var con = mysql.createPool({
	host: `${config.mysql.host}`,
	port: `${config.mysql.port}`,
	user: `${config.mysql.user}`,
	password: `${config.mysql.password}`,
	database: `${config.mysql.database}`,
	multipleStatements: true
});
const dbquery = util.promisify(con.query).bind(con);

// Check if Table Exists if not the bot will create it
await dbquery('SHOW TABLES LIKE \'guilds\'').then(async (rows) => {
	if (rows.length < 1) {
		dbquery(`CREATE TABLE guilds (
		id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
		guildid VARCHAR(50) NULL DEFAULT '0' COLLATE 'utf8mb4_0900_ai_ci',
		prefix VARCHAR(50) NULL DEFAULT '!' COLLATE 'utf8mb4_0900_ai_ci',
		PRIMARY KEY (id) USING BTREE,
		UNIQUE INDEX guildid (guildid) USING BTREE
		);`);
		console.log(chalk.yellow('[MySQL] Created table guilds'));
	} else console.log(chalk.green('[MySQL] Table guilds exists'));
});

const client = new Discord.Client({
	intents: config.bot.intents,
	allowedMentions: { 
		repliedUser: true 
	}
});
await client.login(`${config.bot.token}`);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.slashCommands = new Discord.Collection();

await commandHandler.loadCommands(client);
await eventHandler.loadEvents(client);
await slashCommandHandler.loadSlashCommands(client);

process.on('uncaughtException', function (err) {
	console.error(err);
});