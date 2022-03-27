module.exports = {
    name: 'ping',
    category: 'info',
    usage: 'ping',
    example: 'ping',
    cooldown: 5 * 1000,
    permissions: {
        client: [],
        author: []
    },
    aliases: [],
    description: 'Get the websocket ping..',
    run: async (client, message, args) => {
        return message.channel.send(`🏓 | Ping is \`${client.ws.ping}\` ms.`);
    }
};