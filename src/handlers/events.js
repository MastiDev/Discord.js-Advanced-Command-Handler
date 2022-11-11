import { readdirSync } from 'fs';

async function loadEvents(client) {
    const eventFiles = readdirSync('./src/events').filter(file => file.endsWith('.js'));
    for (let i = 0; i < eventFiles.length; i++) {
        const event = await import(`../events/${eventFiles[i]}`);
        client.on(event.default.event, event.default.execute.bind(null, client));
    }
}

export default { loadEvents };