const express = require('express');
const app = express();
const { Client, Collection } = require('discord.js')
const fs = require('fs')

const client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBERS", "GUILDS", "MANAGE_ROLES", "MANAGE_NICKNAMES", "CHANGE_NICKNAME"],
  intents: 102399,
});
var mysql = require('mysql');
var mysql_config = {
    host: 'localhost',
    user:'root',
    password:'',
    database:'rurpback'
};

function disconnect_handler() {
   let conn = mysql.createConnection(mysql_config);
    conn.connect(err => {
        (err) && setTimeout('disconnect_handler()', 2000);
    });

    conn.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {

            disconnect_handler();
        } else {
            throw err;
        }
    });
    exports.conn = conn;
}

exports.disconnect_handler =  disconnect_handler;

const discordModal = require('discord-modals')
discordModal(client)

module.exports = client;

const dotenv = require('dotenv')
const envFile = dotenv.config()
const config = require('./config.json')
const prefix = config.prefix
const token = process.env['token']



client.on("ready", () => {
    console.log(`NixBot`.green)
    console.log(`Logged in as ${client.user.tag}`.cyan)
    client.user.setActivity("Powered By @JustHanz", {
      type: 'STREAMING',
      url: "https://youtu.be/aLqPy-93B9Y"
    });
  });

  const { WebhookClient } = require('discord.js');
  const hook = new WebhookClient({ url: 'https://discord.com/api/webhooks/1088947688696979527/pHzUy-7tDJZkprmqGUoCE47p-ThDzOOteYrOFxYhK8K46Z73sGOVAD9rb8ruyMc3ZFpy' })
   
  process.on('unhandledRejection', (error) => {
     hook.send(`\`\`\`js\n${error.stack}\`\`\``)
  })
   
  process.on('uncaughtException', (err, origin) => {
     hook.send(`\`\`\`js\n${err.stack}\`\`\``)
  })
   
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    hook.send(`\`\`\`js\n${err.stack}\`\`\``)
  })
   
  process.on('beforeExit', (code) => {
    hook.send(`\`\`\`js\n${code}\`\`\``)
  })
   
  process.on('exit', (code) => {
    hook.send(`\`\`\`js\n${code}\`\`\``)
  })
   
  process.on('multipleResolves', (type, promise, reason) => {
  })

const { promisify } = require('util')
const Ascii = require('ascii-table')
const { glob } = require('glob');
const { SvgExportFlag } = require('@napi-rs/canvas');
const PG = promisify(glob)

//new collections
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.buttons = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync('./commands');

//load the files
['command'].forEach((handler) => {

    require(`./handler/${handler}`)(client)
});

['slashCommand'].forEach((handler) => {
    require(`./handler/${handler}`)(client)
});


app.listen(3302, () => {
    console.log('Listening on port 3302')
  });
  
  app.get('/', (req, res) => {
    res.send(`<h2>Discord.js v13 Quick.db Ticket bot is alive!<h2>`)
  });


// client.snipes = new Map() 
// client.on('messageDelete', function(message, channel) {
//     client.snipes.set(meseventsage.channel.id, { 
//         content: message.content, 
//         author: message.author.id, 
//         image: message.attachments.first() ? message.attachments.first().proxyURL : null
//     })
// })


client.login(token)