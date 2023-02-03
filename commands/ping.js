const Discord = require("discord.js");

client.command = new Discord.Collection();

const ping = {
  name: "ping",
  description: "Show bot latency",
  execute(message) {
    const latency = Math.round(client.ws.ping);
    message.channel.send(`Ping: `${latency}`ms`);
  },
};

module.exports = ping;

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandn = args.shift().toLowerCase();

  const command =
    client.commands.get(commandn) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandn));

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});
