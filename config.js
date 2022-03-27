require('dotenv').config({ path: './config.env' });

module.exports = {
    token: process.env.TOKEN || "",
    db: process.env.DB || "",
    prefix: ">",
    color: {
        default: '#111111',
        error: 'RED'
    }
};