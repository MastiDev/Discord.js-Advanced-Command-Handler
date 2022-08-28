const Event = require("../structures/event.js");
const config = require("../data/config.json");
const { red, yellow } = require('chalk');
const { version } = require('../package.json');
const mysql = require('mysql2');
const util = require('util');

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

module.exports = new Event("ready", async(client) => {
    try {
        console.log(yellow(`[LOGIN] logged in as ${client.user.tag} -> Version ${version}`))

        //ACTIVITY
        let status_state = 0;
        setInterval(() => {
            let status_presences = [
                { type: 'PLAYING', message: 'Version: ' + version },
                { type: 'LISTENING', message: '@' + client.user.tag },
            ];
            status_state = (status_state + 1) % status_presences.length;
            status_presence = status_presences[status_state];
            client.user.setActivity(status_presence.message, { type: status_presence.type });
        }, 5000);

    } catch (error) {
        return console.log(red(`[EVENT] In the event ready an error has occurred -> ${error}`))
    }
});