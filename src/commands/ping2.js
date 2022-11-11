export default {
    name: 'ping2',
    description: 'Ping!2',
    aliases: ['p2'],
    async execute(message, args) {
        message.channel.send('Pong.2');
    }
}