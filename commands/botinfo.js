const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const os = require('os');
const ms = require('ms');

module.exports = {
  name: 'botinfo',
  description: 'Displays information about the bot.',
  execute(message) {
    const stats = {
      servers: message.client.guilds.cache.size.toLocaleString(),
      channels: message.client.channels.cache.size.toLocaleString(),
      users: message.client.users.cache.size.toLocaleString(),
      uptime: ms(message.client.uptime),
      node: process.version,
      memory: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
      platform: `${os.type()} ${os.release()} ${os.arch()}`,
    };

    const embed = new MessageEmbed()
      .setColor('#00ff00')
      .setAuthor(message.client.user.tag, message.client.user.displayAvatarURL())
      .setDescription(``Contribuitor`` - **cryart**\n``Guilds`` - **${stats.servers}**\n``Channels`` - **${stats.channels}**\n``Users`` - **${stats.users}**\n``Uptime`` - **${stats.uptime}**\n``Node.js version`` - **${stats.node}**\n``Memory usage`` - **${stats.memory} MB**\n``Platform`` - **${stats.platform}**)
      .setFooter('Powered by Zluqe');

    message.channel.send({ embeds: [embed] });
  },
};
