import { Client } from 'discord.js';
import chalk from 'chalk';
import { readFileSync } from 'fs';
let version = JSON.parse(readFileSync('./package.json', 'utf8')).version;

export default {
	event: 'ready',
	async execute(client: Client) {
		try {
			console.log(chalk.yellow(`[LOGIN] logged in as ${client.user!.tag} -> Version ${version}`));
		} catch (error) {
			return console.log(error);
		}
	}
};