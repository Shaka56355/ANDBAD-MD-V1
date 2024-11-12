const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'ANDBAD-BOT;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEZ4dnhrdXNzdlRudFlSUkpBQUVHL3JQUUN2K1VMdDJXVU1VcEwzb1Qwcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieXhnOXdZOXp3N1UrU3M1dFBXL2w0aitacVp3RjRFZndxMHUyWlZWbi9RUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSFhEWUg5VWZKRlorQjBpREdSdVhHMUJ6ZjJ3elZLN2I4Y25XbjVxOFhjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEWUt2QmdQUklQNlQyOEpVRVplbHZsczh3SW94ang3TW1zdWdHYjlXSDAwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1FRUwzVUhMOFhzUEpISzVPUkFaejlqMjF4dExINjY4dmRkaE9PR3AwbDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijc2MWVjZXlxSUxUZHlVL2xrQmhIaFFSWjJZUW51TlQwcXBLVFltL01EQmM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUsxUjJuanEzZEx1bUN3bnJrNzZWV0lRYW5sNlVOL3pBVGl4NWNEZTFGMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicHhlajNVOFk0TnV0MzVqYnFKY1k2WGo3dTgrNVhJbDVjYlN6WXZFV3l3MD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZhR3o4bmRqckxwa2JuRGNtWGhYRklKWlJUUnIzcXVCd01GdlV0UDg2bkoxZkp5Z1VUaW1WK3d3K2d3NDVWelFkVjh5cUFkNXFQVlZIQ1VzRjJucGp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzMsImFkdlNlY3JldEtleSI6IktxK3g3UldrcC9BTDRuMEFnaVNRS1oyd3lqWTdiZU03S251cFQrOU1yb1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlVEYUlCZFozUjN1MjAtbVgtTmVZTXciLCJwaG9uZUlkIjoiNWRjODRlNTAtYTIyZC00M2I5LWEwNWItY2JkYzBkMTY1NmFhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFWS2dkanBhS0E3SVF2QlIrWWZvZCtQajNZST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqKysyejJReEo0SncvQzljTzFiR1FGeldmZ009In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiOEg5Q0JTWEQiLCJtZSI6eyJpZCI6IjkyMzIyNTI5NDYwNTo2M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSTMvNHZFRkVJeWZ6cmtHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVjlUZ1Z3VXZuSG1XVXUyZlJUSWN5SUNpbnpzUlQ0L3Q4K1I4Nk41VFVUUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTkVqRkdkdXFLajFlanRiN3NyZnBXSHNRZkZQRmlsQThndE84WENFanhWYWJ6cW9CQU9kQ1B0d040UmlqY3pQbTVtdkk3emdaS3VlSHNsT1djOE9kQXc9PSIsImRldmljZVNpZ25hdHVyZSI6InRlcFptZ0JlZDV5RDVtTkJtU2d2dXZXUzhySDBaVzRrUEdYM2txWHZYUS81SHJYZ0VLZjYzRGFoZ3RFRXF0RFNWOTY2V1ZuL0wzZHJmdXJkWWJRVGd3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMjI1Mjk0NjA1OjYzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZmVTRGY0ZMNXg1bGxMdG4wVXlITWlBb3A4N0VVK1A3ZlBrZk9qZVUxRTAifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzE0MzIzNDV9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
