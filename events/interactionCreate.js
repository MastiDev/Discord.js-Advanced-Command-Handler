const Event = require("../structures/event.js");
const { red } = require('chalk');

module.exports = new Event("interactionCreate", async(client, interaction) => {
    try {

    } catch (error) {
        return console.log(red(`[EVENT] In the event interactionCreate an error has occurred -> ${error}`))
    }
});