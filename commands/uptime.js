const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "uptime",
  description: "View uptime.",
  execute(message) {
    const uptimeSeconds = Math.floor(process.uptime());
    const days = Math.floor(uptimeSeconds / (24 * 60 * 60));
    const hours = Math.floor((uptimeSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((uptimeSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);

    const embed = new MessageEmbed()
      .setDescription(`**${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds**`)
      .setColor('#00ff00');

    message.channel.send({ embeds: [embed] });
  },
};
