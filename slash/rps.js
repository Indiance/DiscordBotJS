// importing the necessary stuff
const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setDescription('rock paper scissors game'),
	async execute(interaction) {
		// initiating a list of elements and making the opponent pick a random one
		const elements = ['rock', 'paper', 'scissors'];
		const chosen = Math.floor(Math.random() * elements.length);
		// setting up a row with button
		const row = new MessageActionRow()
		// adding the various buttons for player to choose
			.addComponents(
				new MessageButton()
					.setCustomId('rock')
					.setLabel('🪨')
					.setStyle('PRIMARY'),
			)
			.addComponents(
				new MessageButton()
					.setCustomId('paper')
					.setLabel('📄')
					.setStyle('PRIMARY'),
			)
			.addComponents(
				new MessageButton()
					.setCustomId('scissors')
					.setLabel('✂️')
					.setStyle('PRIMARY'),
			);
		// let the user pick
		interaction.reply({ content: "Pick your poison", components: [row] });

		// get the button click only from the user that initiated the message (that is why the filter thing exists)
		const filter = i => i.user.id === i.member.id;
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		// what to do if button click in given time period
		collector.on('collect', async i => {
			await i.update({ content: 'A button was clicked!', components: [] });
		});
		collector.on('end', collected => console.log(`Collected ${collected.size} items`));
	}
};