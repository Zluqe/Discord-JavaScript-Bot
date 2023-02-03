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

client.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
  if (err) console.error(err);

  console.log(`${files.length} commands was loaded`);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`${command.name} command was loaded`);
  });
});

fs.readdir("./events", (err, files) => {
  if (err) console.error(err);

  console.log(`${files.length} events was loaded`);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
    console.log(`${file} event was loaded`);
  });
});

fs.readdir("./handlers", (err, files) => {
  if (err) console.error(err);

  console.log(`${files.length} handlers was loaded`);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const handler = require(`./handlers/${file}`);
    handler(client);
    console.log(`${file} handler was loaded`);
  });
});

client.on("ready", () => {
  console.log(`${client.user.tag} is online!`);

  setInterval(() => {
    const status = random.sample(statuses);
    client.user.setPresence({ activity: { name: status }, status: "online" });
  }, 3000);
});

client.login(token);
