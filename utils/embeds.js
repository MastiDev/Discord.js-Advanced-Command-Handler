const Discord = require("discord.js");

exports.errorEmbed = async function(client, message, error) {

    const embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setColor("#FF0000")
        .setDescription(`${error}`)
        .setTimestamp()
        .setFooter({
            text: message.guild.name,
            iconURL: message.guild.iconURL({ dynamic: true })
        });

    message.reply({ embeds: [embed] });
}