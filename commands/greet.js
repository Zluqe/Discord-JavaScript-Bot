const Discord = require("discord.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./greet.sqlite",
});

const Greeting = sequelize.define("greeting", {
  message: { type: Sequelize.TEXT, allowNull: false },
  channelId: { type: Sequelize.STRING, allowNull: false },
});

Greeting.prototype.replaceMessage = function (member) {
  return this.message
    .replace("[username]", member.user.username)
    .replace("[discriminator]", member.user.discriminator)
    .replace("[user]", `<@${member.user.id}>`);
};

module.exports = {
  name: "greet",
  description: "Manages the server's greeting message and channel.",
  execute(message, args) {
    switch (args[0]) {
      case "message":
        Greeting.update({ message: args.slice(1).join(" ") }, { where: { guildId: message.guild.id } });
        message.channel.send(`Greeting message set to: ${args.slice(1).join(" ")}`);
        break;

      case "channel":
        const channel = message.mentions.channels.first();
        Greeting.update({ channelId: channel.id }, { where: { guildId: message.guild.id } });
        message.channel.send(`Greeting channel set to: ${channel}`);
        break;

      case "test":
        Greeting.findOne({ where: { guildId: message.guild.id } })
          .then((greeting) => {
            if (!greeting) {
              message.channel.send("Greeting message or channel not set.");
              return;
            }

            message.guild.channels.cache.get(greeting.channelId).send(greeting.message);
            message.channel.send("Test greeting sent.");
          });
        break;

      default:
        message.channel.send("Invalid command. Usage: [prefix]greet message/channel/test");
        break;
    }
  },
};

client.on("guildMemberAdd", async (member) => {
  const greeting = await Greeting.findOne({ where: { guildId: member.guild.id } });
  if (!greeting) return;

  const channel = member.guild.channels.resolve(greeting.channelId);
  if (!channel) return;

  const message = greeting.replaceMessage(member);
  channel.send(message);
});

sequelize.sync().then(() => {
  console.log("Greeting database synced.");
});
