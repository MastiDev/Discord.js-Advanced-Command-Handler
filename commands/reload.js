const Command = require("../structures/command.js");
const Discord = require("discord.js");
const fs = require("fs");
const chalk = require('chalk');

module.exports = new Command({
	name: "reload",
	description: "reload",
	aliases: [],

	async run(message, args, client) {
		try {
			
            client.commands.clear();
            /**
             * @type {Discord.Collection<string, Command>}
             */
            this.commands = new Discord.Collection();
            this.aliases = new Discord.Collection();

            let commands = 0;
            fs.readdirSync("./commands")
            .filter(file => file.endsWith(".js"))
            .forEach(file => {
                commands++;
                /**
                 * @type {Command}
                 */
                const command = require(`../commands/${file}`);
                console.log(chalk.greenBright(`[COMMAND] Reloaded ${(chalk.yellow(file))} with command ${(chalk.yellow(command.name))} ${(chalk.yellow(`[${command.aliases}]`))}`));
                client.commands.set(command.name, command);
                
                if (command.aliases) {
                    command.aliases.forEach(alias => {
                        this.aliases.set(command.alias, command);
                    });
                };
            });
            console.log(chalk.greenBright(`[COMMAND] Reloaded ${(chalk.yellow(commands))} commands!`));
            message.reply(`${commands} commands have been reloaded!`);

		} catch (error) {
			console.log(error);
		}
	}
});