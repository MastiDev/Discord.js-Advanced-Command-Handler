const Command = require("../structures/command.js");
const Discord = require("discord.js");
const config = require("../data/config.json");
const { red } = require('chalk');
const mysql = require('mysql');
const util = require('util');

const embeds = require('../utils/embeds.js');

var con = mysql.createPool({
    multipleStatements: true,
    insecureAuth: true,
    host: `${config.mysql.host}`,
    port: `${config.mysql.port}`,
    user: `${config.mysql.user}`,
    password: `${config.mysql.password}`,
    database: `${config.mysql.database}`
});

const dbquery = util.promisify(con.query).bind(con);

module.exports = new Command({
	name: "setprefix",
	description: "setprefix",
	aliases: [],

	async run(message, args, client) {
		try {
			if (!message.member.permissions.has("MANAGE_ROLES")) return embeds.errorEmbed(client, message, "You do not have the permission to use this command!");

			let rows = await dbquery(`SELECT * FROM guilds WHERE guildid = '${message.guild.id}'`);	

			if (!args[1]) return embeds.errorEmbed(client, message, `Use ${rows[0].prefix}setprefix <prefix>`);

			await dbquery(`UPDATE guilds SET prefix = '${args[1]}' WHERE guildid = '${message.guild.id}'`);
			
			const embed = new Discord.MessageEmbed()
				.setTitle("Prefix changed!")
				.setDescription(`The prefix has been changed to ${args[1]}`)
				.setColor("149C51")

			message.reply({embeds: [embed]});

		} catch (error) {
            embeds.errorEmbed(client, message, "Something went wrong.");
			console.log(red(`[COMMAND] In the command ${this.name} an error has occurred -> ${error}`))
		}
	}
});