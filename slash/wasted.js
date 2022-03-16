const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wasted')
		.setDescription('Add a wasted overlay on to a person')
		.addMentionableOption(option => option.setName('member').setDescription('get a member\'s avatar')),
	async execute(interaction) {
		// get avatar if any
		const avatar = interaction.options.getMentionable('member').user.avatarURL({'format':'png'}) || interaction.user.avatarURL({'format':'png'});
		const link = `https://some-random-api.ml/canvas/wasted?avatar=${avatar}`;
		interaction.reply(link);
	},
};