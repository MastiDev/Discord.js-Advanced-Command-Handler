export default {
    name: 'ping',
    description: 'Ping!',
    aliases: ['p'],
    async execute(message, args) {
        message.channel.send('Pong.');
    }
}