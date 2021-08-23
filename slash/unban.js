const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    // setup the data
		.setName('unban')
		.setDescription('unban a member')
		.addMentionableOption(option => option.setName('member').setDescription('member to unban').setRequired(true)),
	async execute(interaction) {
        // search for the target
		const target = interaction.options.getMentionable('member');
        /* Try and unban the user
         * if successful -> The message stating that the user was unbanned will appear
         * if unsuccessfull -> The message stating the error will appear
         */
		try {
			interaction.guild.bans.remove(target);
		}
		catch {
			interaction.reply('That action could not be done');
		}
		interaction.reply('The user was unbanned from the server');
	},
};
