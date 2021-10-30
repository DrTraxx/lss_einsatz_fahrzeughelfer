const axios = require("axios");

module.exports = {
    name: "fahrzeug",
    description: "get information about lss vehicles",
    execute(message, args, client) {
        if (!args) {
            message.channel.send({ content: "Bitte nutze `%help` für weitere Hilfe." });
            return;
        }

        axios.get("https://api.lss-cockpit.de/de_DE/vehicletypes.json").then(async vehicleResponse => {
            const aVehicleTypes = vehicleResponse.data;
            const target = args.trim();
            const vehicles = aVehicleTypes.filter(v => v.id == target || v.name.toLowerCase() == target.toLowerCase() || v.short_name.toLowerCase() == target.toLowerCase() || v.class.includes(target.toLowerCase()) || (v.class_alias[0] && v.class_alias[0].toLowerCase() == target.toLowerCase()) || (v.class_alias[1] && v.class_alias[1].toLowerCase() == target.toLowerCase()) || (v.class_alias[2] && v.class_alias[2].toLowerCase() == target.toLowerCase()));
            const vehicleAnswer = await require("../functions/getVehicleEmbed.js").execute(vehicles, target);
            message.delete().then(async() => {
                for (var i in vehicleAnswer) {
                    try {
                        await message.channel.send({ embeds: [vehicleAnswer[i]] });
                    } catch (error) {
                        console.error(error);
                    }
                }
            });
        });
    }
}