import { readdirSync } from 'fs';

async function loadCommands(client) {
    const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
    for (let i = 0; i < commandFiles.length; i++) {
        const cmd = await import(`../commands/${commandFiles[i]}`);
        client.commands.set(cmd.default.name, cmd.default);

        if (cmd.default.aliases) {
            cmd.default.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.default);
            });
        };
    }
}

export default { loadCommands };