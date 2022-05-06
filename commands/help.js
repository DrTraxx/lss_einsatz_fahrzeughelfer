const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "help command",
    async execute(message, args, client) {
        const prefix = client.config.prefix,
            embed = new Discord.MessageEmbed()
            .setColor(34047)
            .setThumbnail("https://bquadrat.berlin/wp-content/uploads/2014/10/Fragezeichen.jpg")
            .setTitle("LSS-Commands")
            .setDescription(`${ prefix }fahrzeug \`X\` - Infos zum Fahrzeug \`X\`\n${ prefix }einsatz \`X\` - Infos zum Einsatz \`X\``);

        try {
            await message.delete();
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    }
}