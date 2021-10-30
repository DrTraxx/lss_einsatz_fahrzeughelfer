const axios = require("axios");

module.exports = {
    name: "einsatz",
    description: "get information about lss missions",
    execute(message, args, client) {
        if (!args) {
            message.channel.send({ content: "Bitte nutze `%help` für weitere Hilfe." });
            return;
        }

        axios.get("https://api.lss-cockpit.de/de_DE/vehicletypes.json").then(async vehicleResponse => {
            const aVehicleTypes = vehicleResponse.data;
            const target = args.trim();
            const missionsAnswer = await require("../functions/getMissionEmbed.js").execute(target, aVehicleTypes);
            message.delete().then(async() => {
                for (var i in missionsAnswer) {
                    try {
                        await message.channel.send({ embeds: [missionsAnswer[i]] });
                    } catch (error) {
                        console.error(error);
                    }
                }
            });
        });
    }
}