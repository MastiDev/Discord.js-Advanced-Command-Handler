const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const Event = require("../Structures/Event.js");
const { version } = require('../package.json');
const config = require("../Data/config.json");
const { MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const core = require('@hazo-development/hazo-core');

module.exports = new Event("ready", client => {

	console.log(yellow(`Angemeldet als '${client.user.tag}'! Version -> ` + version))

    const startup = new Discord.MessageEmbed()
    startup.setTitle(`${client.user.username} | Log`)
    startup.setDescription(Date())
    startup.setColor(`${config.embedcolor}`)
	startup.addField(`Version`, `${version}`)
    startup.setThumbnail(client.user.avatarURL())
    startup.setTimestamp()
    startup.setFooter(`${client.user.username}`, client.user.avatarURL());
    client.channels.cache.get("885142818950111242").send({embeds: [startup]});

    //ACTIVITY
    let status_state = 0;
    client.user.setActivity('you', { type: 'WATCHING' });
    setInterval(() => {
        let status_presences = [
            { type: 'PLAYING',  message: 'Version: '+version},
            { type: 'WATCHING', message: `${client.guilds.cache.size} server.`},
            { type: 'WATCHING', message: `${client.users.cache.size} user.`},
            { type: 'WATCHING', message: `${client.commands.size} commands.`}
        ];
        status_state = (status_state + 1) % status_presences.length;
        status_presence = status_presences[status_state];
        client.user.setActivity(status_presence.message, { type: status_presence.type });
    }, 5000);
    
});
