const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with the websocket ping."),
    run: async (client, interaction) => {
        await interaction.followUp({ content: `🏓 | Ping is \`${client.ws.ping}\` ms.` });
    }
};