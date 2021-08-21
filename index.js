const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { discordtoken } = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.slashes = new Collection();
client.commands = new Collection();

const clientID = '822150538149232650';
const guildID = '787528400754573342';

const commands = [];
const slashfiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of slashfiles) {
	const command = require(`./slash/${file}`);
	client.slashes.set(command.data.name, command);
	commands.push(command.data.toJSON());
}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

const rest = new REST({ version: '9' }).setToken(discordtoken);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientID, guildID),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(discordtoken);