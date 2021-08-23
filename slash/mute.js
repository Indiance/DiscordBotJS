const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	// setting up the data
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('mute a member')
		.addMentionableOption(option => option.setName('member').setDescription('member to mute').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('the reason for muting the member')),
	execute(interaction) {
		// get the data from the input
		const target = interaction.options.getMentionable('member');
		const reason = interaction.options.getString('reason');
		const mutedRole = interaction.guild.roles.cache.find(role => role.name.toLowerCase().includes('muted'));
        /* try and mute the member
         * if successful -> interaction will reply so
         * if not successfull -> interaction will reply in the negative
         */
        // TODO add interaction incase the user has been muted already
		try {
			if (reason === null) {
				target.roles.add(mutedRole);
				interaction.reply(`${target.displayName} has been muted`);
			}
			else {
				target.roles.add(mutedRole);
				interaction.reply(`${target.displayName} has been muted for the reason **${reason}**`);
			}
		}
		catch {
			interaction.reply('that action could not be done');
		}
	},
};
