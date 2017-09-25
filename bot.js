const Discord = require('discord.js');
const ebg13 = require('ebg13');

const config = require('./config');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('[Bot Started]');
});

client.on('message', message => {
  // Get DMs and ROT13 encode them
  if (message.channel.type === 'dm' && message.author.id !== client.user.id) {
    let response = ebg13(message.content);
    message.channel.send(response);
  }
});

client.on('messageReactionAdd', messageReaction => {
  //check if designated Reaction name
  if (messageReaction.emoji.name === 'rot13') {
    let rot13message = ebg13(messageReaction.message.content);
    let embed = new Discord.RichEmbed({
      title: 'Decoded Spoiler',
      description: rot13message
    });
    messageReaction.users.last().send(embed);
  }
});

client.login(config.token);
