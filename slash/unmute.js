
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	// setting up the data
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('unmute a member')
		.addMentionableOption(option => option.setName('member').setDescription('member to unmute').setRequired(true)),
	execute(interaction) {
		// get the data from the input
		const target = interaction.options.getMentionable('member');
		const reason = interaction.options.getString('reason');
		const mutedRole = interaction.guild.roles.cache.find(role => role.name.toLowerCase().includes('muted'));
		/* try and unmute the member
         * if successful -> interaction will reply so
         * if not successfull -> interaction will reply in the negative
         */
		// check if a user is unmuted already
		if (!target.roles.cache.has(mutedRole.id)) {
			return interaction.reply('The user is already unmuted');
		}
		try {
            target.roles.remove(mutedRole);
            interaction.reply(`${target.displayName} has been unmuted`);
		}
        catch {
            return interaction.reply('that action could not be done');
        }
	},
};
