const Command = require("../Structures/Command.js");
const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");
const { MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const { version } = require('../package.json');

module.exports = new Event("ready", client => {
    try {
        console.log(yellow(`[LOGIN] logged in as ${client.user.tag} -> Version ${version}`))
        
        //ACTIVITY
        let status_state = 0;
        client.user.setActivity('you', { type: 'WATCHING' });
        setInterval(() => {
            let status_presences = [
                { type: 'PLAYING',  message: 'Version: '+ version},
                { type: 'WATCHING', message: `${client.guilds.cache.size} server.`},
                { type: 'WATCHING', message: `${client.users.cache.size} user.`},
                { type: 'WATCHING', message: `${client.commands.size} commands.`}
            ];
            status_state = (status_state + 1) % status_presences.length;
            status_presence = status_presences[status_state];
            client.user.setActivity(status_presence.message, { type: status_presence.type });
        }, 5000);

    } catch (error) {
        return console.log(red(`[EVENT] In the event ready an error has occurred -> ${error}`))
    }
});
