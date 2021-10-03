const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright } = require('chalk');

const Discord = require("discord.js");
const Command = require("./Command.js");
const Event = require("./Event.js");

const config = require("../Data/config.json");
const intents = new Discord.Intents(32767);
const fs = require("fs");

class Client extends Discord.Client {
	constructor() {
		super({ intents });

		/**
		 * @type {Discord.Collection<string, Command>}
		 */
		this.commands = new Discord.Collection();

		this.aliases = new Discord.Collection()

		this.prefix = config.prefix;
	}

	start(token) {
		fs.readdirSync("./Commands")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Command}
				 */
				const command = require(`../Commands/${file}`);
				console.log(greenBright(`[COMMAND] ${command.name} loaded with aliases: ${command.aliases}`));
				this.commands.set(command.name, command);
				
				if (command.aliases) {
					command.aliases.forEach(alias => {
						this.aliases.set(command.alias, command);
					});
				};
			});

		fs.readdirSync("./Events")
			.filter(file => file.endsWith(".js"))
			.forEach(file => {
				/**
				 * @type {Event}
				 */
				const event = require(`../Events/${file}`);
				console.log(greenBright(`[EVENT] ${event.event} loaded!`));
				this.on(event.event, event.run.bind(null, this));
			});

		this.login(token);
	}
}

module.exports = Client;
