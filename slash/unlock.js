const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	// setting up the data
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('unlock a channel')
	/* Adding the channel option but keeping it optional incase a person wants
     * to unlock the current channel.
     */
		.addChannelOption(option => option
			.setName('channel')
			.setDescription('channel to unlock'),
		),
	async execute(interaction) {
		const channel = interaction.channel || interaction.options.getChannel('channel');
        channel.permissionOverwrites.create(interaction.guild.roles.everyone, { SEND_MESSAGES: true });
		interaction.reply('The channel has been unlocked');
	},
};
