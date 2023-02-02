// this is a file
const {token, prefix} = require("./config.json");
const Discord = require("discord.js");
const random = require("lodash");

const client = new Discord.Client({
  ws: { intents: Discord.Intents.ALL },
});

const statuses = [
  "Host with Zluqe",
  "Created by 5ws",
  "Modify me"
];

client.on("ready", () => {
  console.log(`${client.user.tag} is online!`);

  setInterval(() => {
    const status = random.sample(statuses);
    client.user.setPresence({ activity: { name: status }, status: "online" });
  }, 3000);
});

client.login(token);
