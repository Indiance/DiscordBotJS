module.exports = {
	name: 'kick',
	description: 'kick a member',
	execute(message, args) {
		// get the user to kick
		const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		// get the reason to ban the user
		args.shift();
		const reason = args.join(' ');
		// TODO - add permission checks and member validity
		if (!target) {
			try {
				target.kick().then((member) => {
					message.channel.send(`${member.displayName} has been kicked from the server for the reason ${reason}`);
				});
			}
			catch {
				message.channel.send('That action could not be done');
			}
		}
	},
};