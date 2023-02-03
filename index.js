const {token, prefix} = require("./config.json");
const Discord = require("discord.js");
const random = require("lodash");
const fs = require("fs");

const prefix = prefix;

const client = new Discord.Client({
  ws: { intents: Discord.Intents.ALL },
});

const createdstatus = "959055077946032229";
const created = client.users.cache.get(createdstatus);

const statuses = [
  "Host with Zluqe",
  "Created by ${created.username}",
  "Modify me"
];

const commands = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
const events = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));
const handlers = fs.readdirSync("./handlers").filter((file) => file.endsWith(".js"));

for (const file of commands) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

for (const file of events) {
  const event = require(`./events/${file}`);
  const eventn = file.split(".")[0];
  client.on(eventn, event.bind(null, client));
}

for (const file of handlerFiles) {
  const handler = require(`./handlers/${file}`);
  const handlern = file.split(".")[0];
  client[handlern] = handler;
}

client.on("ready", () => {
  console.log(`${client.user.tag} is online!`);

  setInterval(() => {
    const status = random.sample(statuses);
    client.user.setPresence({ activity: { name: status }, status: "online" });
  }, 3000);
});

client.login(token);
