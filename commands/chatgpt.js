const openai = require("openai");

module.exports = {
  name: "chatgpt",
  description: "Generates a response using ChatGPT",
  usage: "<message>",
  execute(message, args) {
    const prompt = args.join(" ");

    openai.prompt(prompt, function(err, response) {
      if (err) return message.reply("an error occurred while generating a response.");

      message.channel.send(response.choices[0].text);
    });
  },
};
