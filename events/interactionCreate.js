const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const intents = new Intents(32767);
const client = new Client({ intents });
const slashfiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));
client.slashes = new Collection();
const commands = [];
// reading slash command files
for (const file of slashfiles) {
	const command = require(`../slash/${file}`);
	client.slashes.set(command.data.name, command);
	commands.push(command.data.toJSON());
}
module.exports = {
	name:'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;
		const command = client.slashes.get(interaction.commandName);
		if (!command) return;
		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};