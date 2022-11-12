import chalk from 'chalk';
import config from '../data/config.js';

export default {
	event: 'ready',
	async execute(client) {
		try {
			console.log(chalk.yellow(`[LOGIN] logged in as ${client.user.tag} -> Version ${config.version}`));
		} catch (error) {
			return console.log(error);
		}
	}
};