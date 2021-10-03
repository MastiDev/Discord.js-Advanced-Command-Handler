const Command = require("../Structures/Command.js");
const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const config = require("../Data/config.json");
const { MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');
const { version } = require('../package.json');

module.exports = new Event("interactionCreate", (client, interaction) => {
  try {
    //YOUR CODE
  } catch (error) {
    return console.log(red(`[EVENT] In the event interactionCreate an error has occurred -> ${error}`))
  }
});