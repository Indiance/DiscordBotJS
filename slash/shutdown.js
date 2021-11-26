// importing the necessary stuff
const { SlashCommandBuilder } = require('@discordjs/builders');

// setting up the command
module.exports = {
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('shutdown the bot, owner usage only'),
	async execute(interaction) {
		// check if the command is owner only
		if (interaction.member.id == '494117853642096652') {
			// sending the message, pause the process and then stopping the process
			interaction.reply('shutting the bot down now');
			const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
			await delay(1000);
			process.exit();
		}
		// incase the interaction was not owner only, it will send the necessary message
		else {
			interaction.reply('you are not the owner of the bot');
		}
	}
}