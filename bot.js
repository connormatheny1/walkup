require('dotenv').config();
const Discord = require('discord.io');
const logger = require('winston');
const price = require('crypto-price')

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
const bot = new Discord.Client({
   token: process.env.TOKEN,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')'); 
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(' ');
        let cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'btc': 
                let b;
                price.getCryptoPrice("USD", "BTC").then(obj => { 
                    b = obj.price
                    bot.sendMessage({
                        to: channelID,
                        message: b
                    });
                }).catch(err => {
                    console.log(err)
                })
                break;
            case 'eth':
                let e;
                price.getCryptoPrice("USD", "ETH").then(obj => { 
                    e = obj.price
                    bot.sendMessage({
                        to: channelID,
                        message: e
                    });
                }).catch(err => {
                    console.log(err)
                })
                break;
         }
     }
});