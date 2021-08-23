const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		// setup data
		.setName('kick')
		.setDescription('Kick a member')
		.addMentionableOption(option => option.setName('member').setDescription('Mention a member').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('reason for kicking the member').setRequired(true)),
	async execute(interaction) {
		// get member and reason for kick
		const member = interaction.options.getMentionable('member');
		const reason = interaction.options.getString('reason');
		/* try and kick the member
         * if the member is kicked from the server -> message stating so will appear
         * if not -> error message will appear
         */
		try {
			member.kick().then(mem => {
				interaction.reply(`${mem.displayName} has been kicked for the reason **${reason}**`);
			});
		}
		catch {
			interaction.reply('That action could not be done');
		}
	},
};
