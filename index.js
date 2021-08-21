// import the necessary stuff
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { discordtoken, clientID, guildID } = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// setup the varibles
const intents = new Intents(32767);
const client = new Client({ intents });
client.slashes = new Collection();
// read the files
const commands = [];
const slashfiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
// setting up event files
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
// reading slash command files
for (const file of slashfiles) {
	const command = require(`./slash/${file}`);
	client.slashes.set(command.data.name, command);
	commands.push(command.data.toJSON());
}
// setup slash commands
const rest = new REST({ version: '9' }).setToken(discordtoken);
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(
			Routes.applicationGuildCommands(clientID, guildID),
			{ body: commands },
		);
		console.log('Successfully reloaded application (/) commands.');
	}
	catch (error) {
		console.error(error);
	}
})();
// login the bot
client.login(discordtoken);