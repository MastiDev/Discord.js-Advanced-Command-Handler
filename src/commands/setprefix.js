import Discord from 'discord.js';
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
	name: 'setprefix',
	description: 'Reloads all commands',
	aliases: [],

	async execute(message, args) {
		try {
			if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('You do not have the permission to use this command!');

			let rows = await dbquery(`SELECT * FROM guilds WHERE guildid = '${message.guild.id}'`);	
            
			if (!args[1]) return message.reply(`Use ${rows[0].prefix}setprefix <prefix>`);
            
			await dbquery(`UPDATE guilds SET prefix = '${args[1]}' WHERE guildid = '${message.guild.id}'`);
                        
			const embed = new Discord.EmbedBuilder()
				.setTitle('Prefix changed!')
				.setDescription(`The prefix has been changed to ${args[1]}`)
				.setColor('149C51');
            
			message.reply({embeds: [embed]});
		} catch (error) {
			console.log(error);
		}
	}
};
