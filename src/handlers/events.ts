import { readdirSync } from 'fs';
import chalk from 'chalk';
import { Client } from 'discord.js';

async function loadEvents(client: Client) {
	const eventFiles = readdirSync('./dist/events').filter(file => file.endsWith('.js'));
	if (!eventFiles) return;
	for (let i = 0; i < eventFiles.length; i++) {
		eventFiles[i] = eventFiles[i];
		const event = await import(`../events/${eventFiles[i]}`);
		client.on(event.default.event, event.default.execute.bind(null, client));
		console.log(chalk.greenBright(`[EVENT] Loaded ${(chalk.yellow(eventFiles[i]))} with event ${(chalk.yellow(event.default.event))}`));
	}
}

export default loadEvents;