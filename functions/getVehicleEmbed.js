const Discord = require("discord.js");

module.exports = {
    execute(vehicles, target) {
        return new Promise(resolve => {
            if (vehicles.length > 0) {
                const embeds = [];
                for (var i in vehicles) {
                    const vehicle = vehicles[i];
                    const embed = new Discord.MessageEmbed()
                        .setTitle(vehicle.name + "\nType-ID: " + vehicle.id)
                        .setDescription(`Kurzname: ${ vehicle.short_name }\nFahrzeugklassen: ${ vehicle.class_alias.join(", ") }`)
                        .setThumbnail("http://icons555.com/images/icons-gray/image_icon_ambulance_2_pic_512x512.png")
                        .setColor(16741120)
                        .addFields({ name: "Kosten", value: vehicle.cost.toLocaleString(), inline: true }, { name: "Personal", value: vehicle.personal.min == 0 ? "keins" : `min. ${ vehicle.personal.min.toString() }\nmax. ${ vehicle.personal.max.toString() }`, inline: true });
                    for (key in vehicle.additional) {
                        var value = vehicle.additional[key];
                        switch (key) {
                            case "rank":
                                embed.addFields({ name: "kaufbar ab Rang", value: value, inline: true });
                                break;
                            case "qualification":
                                embed.addFields({ name: "Benötigte Ausbildung", value: value.join(", "), inline: true });
                                break;
                            case "water_bonus":
                                embed.addFields({ name: "Wasserbonus in %", value: value.toString(), inline: true });
                                break;
                            case "mission_time_bonus":
                                embed.addFields({ name: "Zeitbonus in %", value: value.toString(), inline: true });
                                break;
                            case "water":
                                embed.addFields({ name: "Wassermenge in Litern", value: value.toLocaleString(), inline: true });
                                break;
                            case "pump_engine":
                                embed.addFields({ name: "Pumpleistung in Litern pro Minute", value: value.toLocaleString(), inline: true });
                                break;
                            case "prisoners_transport":
                                embed.addFields({ name: "max. transportierbare Gefangene", value: value.toString(), inline: true });
                                break;
                            case "trailer":
                                embed.addFields({ name: "Benötigt Zugfahrzeug", value: value ? "Ja" : "Nein", inline: true });
                                break;
                        }
                    }
                    embeds.push(embed);
                }
                resolve(embeds);
            } else {
                resolve(["Das Fahrzeug/ Die Fahrzeuge `" + target + "` kenne ich nicht."]);
            }
        });
    }
}