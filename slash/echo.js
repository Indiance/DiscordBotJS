const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bold')
		.setDescription('Bolds a message')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back')
				.setRequired(true)),
	async execute(interaction) {
		string = interaction.options.getString('input');
		await interaction.reply(`**${string}**`);
	},
};