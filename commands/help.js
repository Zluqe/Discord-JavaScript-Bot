const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "View all commands commands.",
  usage: "[command]",
  execute(message, args) {
    const client = message.client;
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("Commands list:");
      data.push(commands.map(command => command.name).join(", "));
      data.push(`\nUse \`${client.prefix}help [command name]\` if you want info about a specific command`);

      return message.channel.send(data, { split: true });
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) data.push(`**Usage:** ${client.prefix}${command.name} ${command.usage}`);

    message.channel.send(data, { split: true });
  },
};
