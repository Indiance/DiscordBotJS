module.exports = {
	name:'ban',
	description:'banhammer the plebs',
	execute(message, args) {
		// get the member to ban
		const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		// get the reason
		args.shift();
		// TODO check for permissions and check validity of member
		const reason = args.join(' ');
		try {
			target.ban().then((member) => {
				message.reply(`${member.displayName} has been banned from the server for the reason ***${reason}*`);
			});
		}
		catch {
			message.reply('That action could not be done');
		}
	},
};