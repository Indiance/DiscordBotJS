// importing the necessary stuff
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const snoowrap = require('snoowrap');
const { reddit_clientID, reddit_clientSecret, reddit_username, reddit_password } = require('../config.json');
// setting up the reddit instance (make sure you don't leak your data folks)
const reddit = new snoowrap({
	userAgent: 'DiscordBot by me',
	clientId: reddit_clientID,
	clientSecret: reddit_clientSecret,
	username: reddit_username,
	password: reddit_password,
});
module.exports = {
	// setting up the slash command
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('return a meme from reddit'),
	async execute(interaction) {
		// getting a random post from r/memes
		const memeSubreddit = await reddit.getSubreddit('memes');
		/* reading the submission and aligning it to an embed.
		* Then sending that embed
		*/
		memeSubreddit.getRandomSubmission().then(post => {
			const memeEmbed = new MessageEmbed()
				.setTitle(post.title)
				.setAuthor(post.author.name)
				.setDescription(post.selftext)
				.setURL(`https://www.reddit.com${post.permalink}`)
				.setFooter(`⬆️ ${post.ups} | 💬 ${post.comments.length}`)
				.setImage(post.url);
			interaction.reply({ embeds: [memeEmbed] });
		});
	},
};