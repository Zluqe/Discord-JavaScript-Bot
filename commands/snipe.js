const { MessageEmbed, MessageActionRow, MessageButton, Message } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "Shows the most recent deleted message in the current channel.",
  async execute(client, message, args) {
    const snipes = client.snipes.get(message.channel.id) || [];
    const pageLimit = 5;
    const maxPages = Math.ceil(snipes.length / pageLimit);
    let currentPage = 1;
    
    if (snipes.length === 0) {
      return message.channel.send("There's nothing to snipe");
    }

    const displaySnipes = (snipes, currentPage) => {
      const start = (currentPage - 1) * pageLimit;
      const end = currentPage * pageLimit;
      const snipeList = snipes.slice(start, end);
      const snipeEmbed = new MessageEmbed()
        .setTitle(`Deleted in #${message.channel.name}`)
        .setDescription(snipeList.map((snipe) => `${snipe.content}\n*${snipe.author.tag} (${getTimeDiff(snipe.timestamp)} ago)*`).join("\n"))
        .setFooter(`Page ${currentPage}/${maxPages}`)
        .setColor("BLUE");
      return snipeEmbed;
    };

    const snipeView = async (snipes, currentPage) => {
      const snipeEmbed = displaySnipes(snipes, currentPage);
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId("previous-page")
            .setLabel("Previous")
            .setStyle("PRIMARY")
            .setDisabled(currentPage === 1),
          new MessageButton()
            .setCustomId("next-page")
            .setLabel("Next")
            .setStyle("PRIMARY")
            .setDisabled(currentPage === maxPages),
        );
      const msg = await message.channel.send({ embeds: [snipeEmbed], components: [row] });

      const filter = (interaction) => interaction.user.id === message.author.id;
      const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

      collector.on("collect", async (interaction) => {
        if (interaction.customId === "previous-page") {
          currentPage--;
        } else if (interaction.customId === "next-page") {
          currentPage++;
        }
        await interaction.update({ embeds: [displaySnipes(snipes, currentPage)], components: [row] });
      });

      collector.on("end", async () => {
        await msg.edit({ embeds: [snipeEmbed], components: [row.setComponents([])] });
      });
    };

    snipeView(snipes, currentPage);
  },
};

function getTimeDiff(timestamp) {
  const diff = Date.now() - timestamp;
  if (diff < 1000) {
    return "just now";
  }
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  if (hours < 24) {
    return ${hours} hour${hours > 1 ? "s" : ""} ago;
  }
  const days = Math.floor(hours / 24);
  return ${days} day${days > 1 ? "s" : ""} ago;
}

