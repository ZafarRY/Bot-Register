const { EmbedBuilder } = require("discord.js");

const id_channel = "ID CHANNEL REQ WARGA";
const id_role = "ID ROLE WARGA";
const id_role_remove = "ID ROLE NON WARGA";
const tag = "TAG";

module.exports = {
  name: "register",
  description: "Register to member.",

  run: (bot, message, args) => {
    const EmbedDm = new EmbedBuilder()
      .setTitle("Error")
      .setDescription("Kamu tidak bisa registrasi dari DM.")
      .setColor("#0538ff");
    const EmbedChannel = new EmbedBuilder()
      .setTitle("Error")
      .setDescription(`Kamu bisa menggunakan command ini di <#${id_channel}>`)

      .setColor("#0538ff");
    const EmbedDenied = new EmbedBuilder()
      .setTitle("Error")
      .setDescription(`!register Nama_Kalian`)
      .setColor("#0538ff");
    const EmbedBerhasil = new EmbedBuilder()
      .setTitle("Berhasil")
      .setDescription(
        `${message.author} **Accept**, Kamu sudah menjadi ${tag} di ***${message.guild.name}***.`
      )
      .setColor("#0538ff");

    if (message.channel.type == "dm")
      return message.channel.send({ embeds: [EmbedDm], ephemeral: true });
    if (message.channel.id != `${id_channel}`)
      return message.channel.send({ embeds: [EmbedChannel], ephemeral: true });
    if (!args.length)
      return message.channel.send({ embeds: [EmbedDenied], ephemeral: true });

    const nickname = args.join(" ");
    const private = bot.channels.cache.get(`${id_channel}`);

    try {
      message.member.roles.add(`${id_role}`);
      message.member.roles.remove(`${id_role_remove}`);
      message.member.setNickname(`${tag} ${nickname}`);
      private.send({ embeds: [EmbedBerhasil] });
    } catch (error) {
      console.error(error);
    }
  },
};
