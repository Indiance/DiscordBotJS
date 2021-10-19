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
		.setName('randompost')
		.setDescription('return a random post from a subreddit of a user choice')
		.addStringOption(option => option
            .setName('subreddit')
            .setDescription('subreddit of your choice')
            .setRequired(true)
        ),
	async execute(interaction) {
		// getting the subreddit string
		const srString = interaction.options.getString('subreddit');
		// getting a random post from r/memes
		const subReddit = await reddit.getSubreddit(srString);
		/* reading the submission and aligning it to an embed.
		* Then sending that embed
		*/
        try {
            subReddit.getRandomSubmission().then(post => {
                const randompostEmbed = new MessageEmbed()
                    .setTitle(post.title)
                    .setAuthor(post.author.name)
                    .setDescription(post.selftext)
                    .setURL(`https://www.reddit.com${post.permalink}`)
                    .setFooter(`⬆️ ${post.ups} | 💬 ${post.comments.length}`)
                    .setImage(post.url);
                interaction.reply({ embeds: [randompostEmbed] });
            })
        }
        // A very primitive form of error handling. TODO: Fix it
        catch {
            interaction.reply('This subreddit could not be found');
        }
	},
};
