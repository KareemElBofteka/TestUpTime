const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'ping') {
    message.channel.send('Pong!');
  }
});

app.get('/', (req, res) => {
  res.status(200).send('Bot is running!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Web server running');
});

require('dotenv').config();
client.login(process.env.TOKEN);
