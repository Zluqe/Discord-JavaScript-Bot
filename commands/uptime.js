const Discord = require("discord.js");

module.exports = {
  name: "uptime",
  description: "View uptime.",
  execute(message, args) {
    const client = message.client;
    const data = [];
    const { commands } = message.client;

