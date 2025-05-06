const { SlashCommandBuilder } = require('discord.js');
const { createTweet } = require('../events/createTweet.js');
const { syncCooldownTable, getCooldown, upsertCooldown } = require('../events/databaseManager.js');
const { cmdCooldown } = require('../libs/config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tweet')
        .setDescription('Create and post a tweet')
        .addStringOption(option => 
            option.setName('content')
                .setDescription('The content of the tweet')
                .setRequired(true)
                .setMaxLength(280)),
    async execute(interaction) {
        const userId = interaction.user.id;

        syncCooldownTable();

        const cooldownEntry = await getCooldown(userId);
        const now = new Date();

        if (cooldownEntry) {
            const lastUsed = new Date(cooldownEntry.lastUsed);
            const timeDiff = now - lastUsed;
            const cooldownTime = parseInt(cmdCooldown) * 1000; // Convert to milliseconds

            if (timeDiff < cooldownTime) {
                const remainingTime = Math.ceil((cooldownTime - timeDiff) / 1000);
                const unixTimestamp = Math.floor((Date.now() + (remainingTime * 1000)) / 1000); // Convert to Unix timestamp
                return interaction.reply({ content: `Please wait <t:${unixTimestamp}:R> before using this command again.`, ephemeral: true });
            } else {
                await upsertCooldown(userId, now);
            }
        }

        await upsertCooldown(userId, now);

        try {
            await interaction.deferReply({ ephemeral: true });
            await createTweet(interaction, interaction.options.getString('content'));
            await interaction.editReply({ content: 'Tweeted!', ephemeral: true });
        }
        catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'There was an error while creating the tweet!', ephemeral: true });
        }
    }
};
