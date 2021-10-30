module.exports = {
    name: "messageCreate",
    execute(client, message) {
        const prefix = client.config.prefix;

        if (!message.content.startsWith(prefix)) return;

        var args = message.content.slice(prefix.length).trim().split(" ");
        const command = args.shift().toLowerCase();
        args = args.join(" ");

        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).execute(message, args, client);
        } catch (error) {
            console.error(error);
        }
    }
}