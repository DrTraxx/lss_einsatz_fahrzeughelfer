module.exports = {
    name: "ready",
    execute(client) {
        //console.log(client);
        console.info(`Bot "${ client.user.username }" ist online! Ready at: ${ client.readyAt }`);

        setInterval(() => {
            const activities = require("../json/activity.json");
            const idx = Math.floor(Math.random() * activities.length);
            client.user.setActivity(activities[idx].status, { type: activities[idx].type });
        }, 10000);
    }
}