import util from 'util';
import mysql from 'mysql2';
import config from '../data/config.js';

var con = mysql.createPool({
	host: `${config.mysql.host}`,
	port: `${config.mysql.port}`,
	user: `${config.mysql.user}`,
	password: `${config.mysql.password}`,
	database: `${config.mysql.database}`,
	multipleStatements: true
});
const dbquery = util.promisify(con.query).bind(con);

export default {
	event: 'messageCreate',
	async execute(client, message) {
		try {
			if (message.author.bot) return;
			let prefix = await getPrefix(message.guild.id);
	
			if (message.content.startsWith(prefix)) {
				const args = message.content.substring(prefix.length).split(/ +/);
				const command = client.commands.find(cmd => cmd.name == args[0] || cmd.aliases.includes(args[0]));
				if (!command) return; //message.reply(`${args[0]} is not a valid command!`); //uncomment if you want that the bot replies when the command is not a valid command!
				command.execute(message, args, client);
			} else {
				// Here you can add commands that are not have a prefix.
				// like when somebody pings the bot.
			}
		} catch (error) {
			console.log(error);
		}
	}
};

async function getPrefix(guildid) {
	let rows = await dbquery(`SELECT prefix FROM guilds WHERE guildid = ${guildid}`);
	if (rows.length < 1) {
		await dbquery(`INSERT IGNORE INTO guilds (id, guildid) VALUES (NULL, '${guildid}')`);
		return '!';
	}
	if (rows[0].prefix == null) {
		await dbquery(`UPDATE guilds SET prefix = '!' WHERE guildid = ${guildid}`);
		return '!';
	}
	return rows[0].prefix;
}