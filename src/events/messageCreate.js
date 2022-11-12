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
				if (!command) return;
				try {
					command.execute(message, args, client);
				} catch (error) {
					message.reply('There was an error trying to execute that command!');
					console.log(error);
				}
			} else {
				if (message.mentions.users.first() == client.user) message.channel.send('Hello!');
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