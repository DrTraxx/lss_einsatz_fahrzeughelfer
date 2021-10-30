const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
    execute(target, aVehicleTypes) {
        return new Promise(resolve => {
            axios.get("https://www.leitstellenspiel.de/einsaetze.json").then(async missionResponse => {
                const aMissions = missionResponse.data;
                const missions = aMissions.filter(m => m.id == target || m.name.toLowerCase() == target.toLowerCase());
                const embeds = [];
                if (missions.length) {
                    for (var i in missions) {
                        var mission = missions[i];
                        var key;
                        var embed = new Discord.MessageEmbed()
                            .setTitle(mission.name)
                            .setDescription(`Leitstellenspiel Einsatzlaufkarte Nr. ${ mission.id }`)
                            .setThumbnail("https://das-mobilzentrum.eichenzell.com/wp-content/uploads/2020/06/blaulicht.png")
                            .setColor(16741120)
                            .addFields({ name: "Credits", value: mission.average_credits ? mission.average_credits.toLocaleString() : `${ 0 }`, inline: true });
                        if (mission.place !== "") {
                            embed.addFields({ name: "POI", value: mission.place, inline: true });
                        }
                        if (Object.keys(mission.requirements).length) {
                            var misReq = "";
                            for (key in mission.requirements) {
                                if (key === "water_damage_pump") {
                                    misReq += `Feuerlöschpumpen: ${ mission.requirements[key] }\n`;
                                } else if (key === "min_pump_speed") {
                                    misReq += `min. Pumpengeschw.: ${ mission.requirements[key].toLocaleString() } l/min\n`;
                                } else if (key === "water_needed") {
                                    misReq += `benötigtes Wasser: ${ mission.requirements[key].toLocaleString() } Liter\n`;
                                } else {
                                    var keyClass = aVehicleTypes.find(t => t.class[0] === key).class_alias[0];
                                    misReq += `${ keyClass }: ${ mission.requirements[key] }\n`;
                                }
                            }
                            embed.addFields({ name: "benötigte Fahrzeuge", value: misReq.trim(), inline: true });
                        } else {
                            embed.addFields({ name: "benötigte Fahrzeuge", value: "Rettungsdienst", inline: true });
                        }
                        if (Object.keys(mission.chances).length) {
                            var misCha = "";
                            for (key in mission.chances) {
                                if (key == "patient_transport") {
                                    misCha += "Transport: " + mission.chances[key] + "%\n";
                                } else if (key == "patient_other_treatment") {
                                    misCha += "Tragehilfe: " + mission.chances[key] + "%\n";
                                } else {
                                    var keyCha = aVehicleTypes.find(v => v.class[0] === key).class_alias[0];
                                    misCha += keyCha + ": " + mission.chances[key] + "%\n";
                                }
                            }
                            embed.addFields({ name: "Wahrscheinlichkeiten", value: misCha.trim(), inline: true });
                        }
                        if (mission.additional) {
                            var embAddText = "";
                            for (key in mission.additional) {
                                var addVal = mission.additional[key];
                                switch (key) {
                                    case "expansion_missions_ids":
                                        var expNames = () => {
                                            const output = [];
                                            for (var idx in addVal) {
                                                output.push(aMissions.find(m => m.id == addVal[idx]).name);
                                            }
                                            return output;
                                        }
                                        embed.addFields({ name: "mögl. Ausbreitungen", value: expNames().join("\n"), inline: true });
                                        break;
                                    case "followup_missions_ids":
                                        var folNames = () => {
                                            const output = [];
                                            for (var idx in addVal) {
                                                output.push(aMissions.find(m => m.id == addVal[idx]).name);
                                            }
                                            return output;
                                        }
                                        embed.addFields({ name: "mögl. Folgeeinsätze", value: folNames().join("\n"), inline: true });
                                        break;
                                    case "possible_patient_min":
                                        embAddText += "min. Patienten: " + addVal + "\n";
                                        break;
                                    case "possible_patient":
                                        embAddText += "max. Patienten: " + addVal + "\n";
                                        break;
                                    case "patient_specializations":
                                        embAddText += "Fachrichtung im Krankenhaus: " + addVal + "\n";
                                        break;
                                    case "patient_at_end_of_mission":
                                        embAddText += "Patienten erst am Ende des Einsatzes sichtbar\n";
                                        break;
                                    case "max_possible_prisoners":
                                        embAddText += "max. Gefangene: " + addVal + "\n";
                                        break;
                                    case "pump_water_amount":
                                        embAddText += "abzupummpendes Wasser: " + addVal.toLocaleString() + " Liter\n";
                                        break;
                                    case "allow_rw_instead_of_lf":
                                        embAddText += "RW kann LF ersetzen\n";
                                        break;
                                    case "allow_gwoil_instead_of_lf":
                                        embAddText += "GW-Öl kann LF ersetzen\n";
                                        break;
                                    case "allow_arff_instead_of_lf":
                                        embAddText += "FLF kann LF ersetzen\n";
                                        break;
                                    case "allow_ktw_instead_of_rtw":
                                        embAddText += "KTW kann RTW ersetzen\n";
                                        break;
                                    case "allow_ktw_b_instead_of_rtw":
                                        embAddText += "KTW Typ B kann RTW ersetzen\n";
                                        break;
                                    case "patient_allow_first_responder_chance":
                                        embAddText += "First Responder behandelt Patient mit Wahrscheinlichkeit von " + addVal + "% komplett\n";
                                        break;
                                }
                            }
                            if (embAddText) {
                                embed.addFields({ name: "Zusätzliches", value: embAddText.trim(), inline: true });
                            }
                        }
                        embeds.push(embed);
                    }
                    resolve(embeds);
                } else {
                    resolve(["Den Einsatz `" + target + "` kenne ich nicht."]);
                }
            });
        });
    }
}