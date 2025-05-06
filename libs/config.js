const dotenv = require('dotenv');
dotenv.config('./.env');

module.exports = {
    discordToken: process.env.TOKEN,
    discordClientId: process.env.CLIENT,
    cmdCooldown: process.env.COOLDOWN,
    channelID: process.env.CHANNELID,
    sqliteFileName: process.env.SQLITE_FILE_NAME,
    sqliteDatabase: process.env.SQLITE_DATABASE
}