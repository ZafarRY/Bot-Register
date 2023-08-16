const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, ModalBuilder } = require('discord.js');
const fs = require("fs");
var http = require("http");

const token = process.env['TOKEN'];

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bot.commands = new Collection();
bot.prefix = new Map();

const prefixFolder = fs
  .readdirSync("./prefix")
  .filter((f) => f.endsWith(".js"));

for (arx of prefixFolder) {
  const cmd = require("./prefix/" + arx);
  bot.prefix.set(cmd.name, cmd);
}

bot.on(`ready`, () => {
  console.log(`${bot.user.username} sudah Online!`);
});

bot.on("messageCreate", async (message) => {
  const prefix = "!";

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLocaleLowerCase();
  const prefixcmd = bot.prefix.get(command);
  if (prefixcmd) {
    prefixcmd.run(bot, message, args);
  }
});

bot.login(token);

http.createServer(function (req, res) {
    res.write("Im alive");
    res.end();
  })
  .listen(8080);