const Discord = require("discord.js");

const prefix = prefix;

module.exports = (client) => {
  client.on("message", (message) => {
    if (message.mentions.users.has(client.user.id)) {
      message.reply(`My prefix is \`${client.prefix}\``);
    }
  });
};
