const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ005QVVDL0ZMMFpneWQyd0JVd3RxbDFGY2s2VjFmaXhNWEZHbVIzYXlVYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUZqcHZZM3VhQVRrUEZRR1ZSSmd6eUlGWllKMUV3Rnc3cmY1NTZXRVZFTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5T2V5K1pHUHcrYzV3L01YNGcxWGMvci9SRHltNkYvRWlmUFdaWSt1T240PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJSkgyVHZaMmdnZVJ0VFFxbU9HcnFHdG91Zm5UdGJEcWcrSjd4aUNiWmtnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdONjhST3BMOE1Bdk9uNzhSNkJhellxYWk4MU1VTDF0MEJCR0lZaGtCbGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhnQzlobXgzNEo4dUlzYXZUTlBmeUZDeHp2bDNGMUdPd1l2c2xBR3lhV2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUtYaTBLdDZEZ0hubGR0MW5vek5rMnZsYXNpbzk5aUhqcDdyWmIxNGdVaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE9wWnBwUFVHL1BLVDBnOS9CQ0g4NWtWYmpWVC9xR214WlNDcFVQK2JFWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJsWDVWajJKb3M5WFBjWlRWQ3FqSVQxTUlXMk9Nb21kMmZvWFBGRVVWMkYvZERwRHNpQkREV0ZTTHFCWXpPc2M5YnBlT1gxYzdOcnZrTnYyWTRjaUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjYsImFkdlNlY3JldEtleSI6ImlNSkVjeHh4R24xTktUQmdOQVF4Qmo0ZEM4Yk52QXMzR2puNzRHWDVJNGs9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzgyMDkzMzg0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjFFMkQ1RjIwQjMzRTkxMTI5RENDQjhCNDFFNkUxMjVDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDUzMjI3MDF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4MjA5MzM4NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDQzkyNTJENzFBOEM2QjcxRTRFOENBRUNFQ0VGRkRFRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1MzIyNzAyfV0sIm5leHRQcmVLZXlJZCI6MzMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMywiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJGSHRjNFpEUFFyU3B4YXpoQUROZnJnIiwicGhvbmVJZCI6IjA2Y2Q4NzIxLTdlODQtNDYyMi1hOThhLTllZTAzMjRlYThkMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEZ0cxSjdPbVhoR2tPYURUVS9NQnk0d2ZJTDQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS09JendRNUhqa0doMmNPUmlXRHBRSm1SdGNVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhGUDhCU0ZRIiwibWUiOnsiaWQiOiIyNjM3ODIwOTMzODQ6MzhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU2FsYWRpYyBnYW5nc3RhIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMZmcvZElIRUx1Rm5zQUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJFSHZudnBLU3hpMG1CenpwUzBEQnlJTjNnQ3NzVGpqU0pYOXp4VTBEclhrPSIsImFjY291bnRTaWduYXR1cmUiOiJqTXBCRDJ5NTVoWHdxb2k0dmkzZ2lRL1psdjBFOEsrT3FPdkZsVm9pamFHUS8wd3VYUVozWGU3UDF0L0ppUllZQkYxV3R6d1NGQUJ2L1pOTHB0R1ZEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQVF6bHkyQ095SWdJT01MQ0NzMm5jZTZxQ3dEUXNEYkxLQ3VOK1M1MXN3bGpZNER1SmlqYm5XMlUwWnpFTTlBSFliMUNLYlFmVFRyZmhTb0xMSVBaQVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3ODIwOTMzODQ6MzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUkI3NTc2U2tzWXRKZ2M4NlV0QXdjaURkNEFyTEU0NDBpVi9jOFZOQTYxNSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTMyMjY5NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJQW0ifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "SALADIC GANGSTER",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "SALADIC GANGSTER",              
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
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
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

