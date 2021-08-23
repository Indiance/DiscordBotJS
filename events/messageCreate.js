const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const intents = new Intents(32767);
const client = new Client({ intents });
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Collection();
const prefix = '+';
// get the command files
for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	client.commands.set(command.name, command);
}
module.exports = {
	name: 'messageCreate',
	execute(message) {
		if (!message.content.startsWith(prefix) || message.author.bot) return;
		const args = message.content.slice(prefix.length).split(/ +/);
		const command = args.shift().toLowerCase();
		client.commands.get(command).execute(message, args);
	},
};