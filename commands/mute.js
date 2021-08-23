module.exports = {
	name: 'mute',
	description: 'mute a user',
	execute(message, args) {
		// get the user to mute
		const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		// get the reason
		args.shift();
		const reason = args.join(' ');
		// get the muted role. TODO - figure out how to detect based on role names other tham muted and check for permissions
		const mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase().includes('muted'));
		// check if the user is muted already
		if (target.roles.cache.has(mutedRole.id)) {
			return message.reply('The user is already muted');
		}
		if (reason === null) {
			target.roles.add(mutedRole);
			return message.reply(`${target.displayName} has been muted`);
		}
		else {
			target.roles.add(mutedRole);
			return message.reply(`${target.displayName} has been muted for the following reason **${reason}**`);
		}
	},
};