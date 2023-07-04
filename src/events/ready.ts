import { Client } from 'discord.js';
import chalk from 'chalk';
import { readFileSync } from 'fs';
const version = JSON.parse(readFileSync('./package.json', 'utf8')).version;

export default {
	event: 'ready',
	async execute(client: Client) {
		try {
			if (!client.user) return console.log(chalk.red('[LOGIN] Failed to login!'));
			console.log(chalk.yellow(`[LOGIN] logged in as ${client.user.tag} -> Version ${version}`));
		} catch (error) {
			return console.log(error);
		}
	}
};