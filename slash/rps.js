// importing the necessary stuff
const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow, MessageButton } = require('discord.js');
// sleep function
function sleep() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setDescription('rock paper scissors game'),
	async execute(interaction) {
		// initiating a list of elements and making the opponent pick a random one
		const elements = ['rock', 'paper', 'scissors'];
		const chosen = elements[Math.floor(Math.random() * elements.length)];
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
		interaction.reply({ content: "Pick your poison", components: [row], ephemeral: true});
		// get the button click only from the user that initiated the message (that is why the filter thing exists)
		const collector = interaction.channel.createMessageComponentCollector({ max: 1, time: 20000 });
		// what to do if button click in given time period
		collector.on('collect', async i => {
			await i.reply({ content: 'A choice was made!', components: [] });
			await sleep();
			await i.editReply({ content: 'The opponent chose something as well!', components: []});
			/*
			TODO: Work on a function to check for who wins what.
			Make this a separate function for readability
			*/
		});
		collector.on('end', collected => console.log(`Collected ${collected.size} items`));
	}
};