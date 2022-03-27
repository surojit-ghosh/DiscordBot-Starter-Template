const { Client, Intents, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const mongoose = require('mongoose');

const config = require('./config.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        // Intents.FLAGS.GUILD_BANS,
        // Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        // Intents.FLAGS.GUILD_INTEGRATIONS,
        // Intents.FLAGS.GUILD_WEBHOOKS,
        // Intents.FLAGS.GUILD_INVITES,
        // Intents.FLAGS.GUILD_VOICE_STATES,
        // Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        // Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        // Intents.FLAGS.GUILD_MESSAGE_TYPING,
        // Intents.FLAGS.DIRECT_MESSAGES,
        // Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        // Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        // Intents.FLAGS.GUILD_SCHEDULED_EVENTS
    ]
});

client.config = config;
client.color = config.color;

client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();

// connect to db
mongoose.connect(config.db).then((db) => {
    console.log(`Database connected :: ${db.connections[0].name}`);
}).catch((err) => {
    console.log(chalk.red(`Error while connecting to database :: ${err.message}`));
});

// commands handler
readdirSync('./commands').forEach((folder) => {
    readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js')).forEach((file) => {
        import(`./commands/${folder}/${file}`).then((cmd) => {
            cmd = cmd?.default;
            if (!cmd?.run) return console.log(`Unable to load command :: ${file}`);
            cmd.name = cmd.name || file.replace('.js', '');
            cmd.category = cmd.category || folder;
            client.commands.set(cmd.name, cmd);
            if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
            console.log(`Successfully loaded command :: ${file}`);
        });
    });
});

// events handler
readdirSync('./events').filter((file) => file.endsWith('.js')).forEach((file) => {
    import(`./events/${file}`).then((event) => {
        event = event?.default;
        if (!event?.run) return console.log(`Unable to load event :: ${file}`);
        event.name = event.name || file.replace('.js', '');
        client.on(event.name, event.run.bind(null, client));
        console.log(`Successfully loaded event :: ${file}`);
    });
});

// slash commands handler
readdirSync('./slashCommands').forEach((folder) => {
    readdirSync(`./slashCommands/${folder}`).filter((file) => file.endsWith('.js')).forEach((file) => {
        import(`./slashCommands/${folder}/${file}`).then((cmd) => {
            cmd = cmd?.default;
            if (!cmd?.run || !cmd?.data) return console.log(chalk.red(`Unable to load slash command :: ${file}`));
            let name = cmd.data.name;
            client.slashCommands.set(name, cmd);
            console.log(`Successfully loaded slash command :: ${file}`);
        });
    });
});

client.login(config.token);