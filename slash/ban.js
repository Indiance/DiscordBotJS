const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	// setup the data
		.setName('ban')
		.setDescription('Ban a member')
		.addMentionableOption(option => option.setName('member').setDescription('The member to ban').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason for the ban').setRequired(true)),
	async execute(interaction) {
		// get the target and reason for ban
		const target = interaction.options.getMentionable('member');
		const reason = interaction.options.getString('reason');
		/* try and ban the member
         * once done, a message stating that the user has been banned will appear
         * if not done, an error message will appear
         */
		try {
			target.ban().then((member) => {
				interaction.reply(`${member.displayName} has been banned from the server due to **${reason}**`);
			});
		}
		catch {
			interaction.reply('That action could not be done');
		}
	},
};
