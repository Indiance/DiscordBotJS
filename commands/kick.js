module.exports = {
	name: 'kick',
	description: 'kick a member',
	execute(message, args) {
		const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!target) {
			try {
				target.kick().then((member) => {
					message.channel.send(`${member.displayName} has been kicked from the server`);
				});
			}
			catch {
				message.channel.send('That action could not be done');
			}
		}
	},
};