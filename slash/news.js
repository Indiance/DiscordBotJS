const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const newsapi = require('newsapi');
const { newstoken } = require('../config.json');
const api = new newsapi(newstoken);
module.exports = {
	data: new SlashCommandBuilder()
		.setName('news')
		.setDescription('Search for the news')
		.addStringOption(option => option
			.setName('query')
			.setDescription('topic to search on')
			.setRequired(true))
		.addIntegerOption(option => option
			.setName('number')
			.setDescription('number of articles to display')
			.setRequired(true)),
	execute(interaction) {
		// get the query and the number of articles
		const articleNumber = interaction.options.getInteger('number');
		const articleQuery = interaction.options.getString('query');
		// querying and getting the response (hopefully)
		api.v2.everything({
			q: articleQuery,
			language: 'en',
		}).then(response => {
			// incase there are no responses for the article, return an error
			if (response.totalResults === 0) {
				interaction.reply('no articles could be found on that topic');
			}
			else {
				interaction.reply(`Processing News articles for topic *${articleQuery}*`);
				for (let i = 0; i < articleNumber; i++) {
					const article = response.articles[i];
					const articleEmbed = new MessageEmbed()
						.setTitle(article['title'])
						.setURL(article['url'])
						.setImage(article['urlToImage'])
						.setDescription(article['description']);
					interaction.channel.send({ embeds: [articleEmbed] });
				}
			}
		});
	},
};
