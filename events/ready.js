export default {
    name: 'ready',
    run: async (client) => {
        console.log('Ready logged in as :: ' + client.user.username);

        client.user.setPresence({
            activities: [{ name: `To Jit`, type: 'LISTENING' }]
        });

        // client.user.setAvatar('./assets/avatar.jpg');
    }
};