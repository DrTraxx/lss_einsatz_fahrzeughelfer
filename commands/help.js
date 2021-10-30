const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "help command",
    execute(message, args, client) {
        const embed = new Discord.MessageEmbed()
            .setColor(34047)
            .setThumbnail("https://bquadrat.berlin/wp-content/uploads/2014/10/Fragezeichen.jpg")
            .setTitle("LSS-Commands")
            .setDescription("%fahrzeug `X` - Infos zum Fahrzeug `X`\n%einsatz `X` - Infos zum Einsatz `X`");

        try {
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    }
}