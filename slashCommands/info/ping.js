import { SlashCommandBuilder } from '@discordjs/builders';

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with the websocket ping."),
    run: async (client, interaction) => {
        await interaction.followUp({ content: `🏓 | Ping is \`${client.ws.ping}\` ms.` });
    }
};