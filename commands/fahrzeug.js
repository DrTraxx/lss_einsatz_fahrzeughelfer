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
            const target = args.trim().toLowerCase();
            const vehicles = aVehicleTypes.filter(v => v.id == target || v.name.toLowerCase().includes(target) || v.short_name.toLowerCase().includes(target) ||
                v.class.includes(target) || v.class_alias.map(e => e.toLowerCase()).includes(target));
            const vehicleAnswer = await require("../functions/getVehicleEmbed.js").execute(vehicles, target);
            message.delete().then(async () => {
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