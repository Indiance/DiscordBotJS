module.exports = {
	name: 'unmute',
	description: 'unmute a user',
	execute(message, args) {
		// get the user to unmute
		const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		// get the muted role. TODO - figure out how to detect based on role names other tham muted and check for permissions
		const mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase().includes('muted'));
		// check if the user is unmuted already
		if (!target.roles.cache.has(mutedRole.id)) {
			return message.reply('The user is already unmuted');
		}
		try {
			target.roles.remove(mutedRole).then((member) => {
				message.channel.send(`${member.displayName} has been unmuted`);
			});
		}
		catch {
			message.channel.send('That action could not be done');
		}
	},
};
