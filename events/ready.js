const { Events } = require('discord.js');
const { connectDatabase } = require('./databaseManager.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        await connectDatabase();
        console.log(`${client.user.tag} is ready to use.`);
    },
}