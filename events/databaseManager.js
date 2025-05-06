const sequelize = require('sequelize');
const { sqliteFileName, sqliteDatabase } = require('../libs/config.js');
let dbConn = null;
let cooldown = null;

async function connectDatabase() {
    // Username and password are not needed for SQLite
    dbConn = new sequelize(sqliteDatabase, "", "", {
        dialect: 'sqlite',
        logging: false,
        storage: sqliteFileName
    });
    await createTemplateTable(dbConn);
}

async function createTemplateTable(dbConn) {
    cooldown = dbConn.define('Cooldown', {
        userId: {
            type: sequelize.STRING,
            primaryKey: true
        },
        lastUsed: {
            type: sequelize.DATE,
            allowNull: false
        }
    });

    cooldown.sync();
}

async function syncCooldownTable() {
    if (dbConn) {
        await dbConn.sync();
    } else {
        console.error('SQLite Database is not connected.');
    }
}

async function getCooldown(userId) {
    if (!dbConn) {
        console.error('SQLite Database is not connected.');
        return null;
    }
    const cooldownEntry = await cooldown.findByPk(userId);
    return cooldownEntry;
}

async function upsertCooldown(userId, lastUsed) {
    if (!dbConn) {
        console.error('SQLite Database is not connected.');
        return null;
    }
    await cooldown.upsert({ userId, lastUsed });
}


module.exports = {
    connectDatabase,
    syncCooldownTable,
    getCooldown,
    upsertCooldown
};