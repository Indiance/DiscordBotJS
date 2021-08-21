const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member')
		.addMentionableOption(option => option.setName('member').setDescription('Mention a member').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('reason for kicking the member')),
	async execute(interaction) {
		const member = interaction.options.getMentionable('member');
		const reason = interaction.options.getString('reason');
		try {
			member.kick().then(mem => {
				interaction.reply(`${mem.displayName} has been kicked for the reason ${reason}`);
			});
		}
		catch {
			interaction.reply('That action could not be done');
		}
	},
};