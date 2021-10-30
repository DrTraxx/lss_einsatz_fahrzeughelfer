const Discord = require("discord.js");

module.exports = {
    name: "dev",
    desciption: "send an embed with develeopment information to update channel in all servers",
    execute(message, args, client) {
        if (message.author.id != client.config.bot_owner) return;

        const embed = new Discord.MessageEmbed(),
            title = args.split(";")[0].trim(),
            description = args.split(";")[1].trim(),
            date = new Date();

        embed.setTitle(title)
            .setDescription(description)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor(34047)
            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Info_Sign.svg/1024px-Info_Sign.svg.png")
            .setFooter(date.toLocaleDateString() + " - " + date.toLocaleTimeString() + " Uhr")

        try {
            message.delete();
            for (var i in client.config.guilds) {
                var e = client.config.guilds[i],
                    guild = client.guilds.cache.find(g => g.id === e.id),
                    guildChannel = guild.channels.cache.find(c => c.id === e.update_channel);

                guildChannel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error(error);
        }
    }
}