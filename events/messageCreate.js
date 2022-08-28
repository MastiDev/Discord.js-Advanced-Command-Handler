const Event = require("../structures/event.js");
const config = require("../data/config.json");
const mysql = require('mysql2');
const util = require('util');

var con = mysql.createPool({
    host: `${config.mysql.host}`,
    port: `${config.mysql.port}`,
    user: `${config.mysql.user}`,
    password: `${config.mysql.password}`,
    database: `${config.mysql.database}`
});

const dbquery = util.promisify(con.query).bind(con);

module.exports = new Event("messageCreate", async(client, message) => {
    try {
        if (message.author.bot) return;

        const rows = await dbquery(`SELECT * FROM guilds WHERE guildid = ${message.guild.id}`);

        if (rows.length < 1) await dbquery(`INSERT INTO guilds (id, guildid) VALUES (NULL, '${message.guild.id}')`);
        
        const p = await getprefix(message.guild.id);
        const prefix = await p;

        if (message.content.startsWith(prefix)) {
            const args = message.content.substring(prefix.length).split(/ +/);
            const command = client.commands.find(cmd => cmd.name == args[0] || cmd.aliases.includes(args[0]));
            if (!command) return //message.reply(`${args[0]} is not a valid command!`); //uncomment this if you want that the bot replies when the error is not a valid command!
            command.run(message, args, client)
        } else {
            // Here you can add commands that are not have a prefix.
            // like when somebody pings the bot.
        }

    } catch (error) {
        return console.log(error);
    }
});

async function getprefix(id) {
    const rows = await dbquery(`SELECT * FROM guilds WHERE guildid = '${id}'`);
    if (rows.length < 1) {
        return "%";
    }
    return rows[0].prefix;
}