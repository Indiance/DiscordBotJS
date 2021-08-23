module.exports = {
	name:'unban',
	description:'unban a user',
	execute(message, args) {
		const target = args[0];
		try {
			message.guild.bans.remove(target).then(message.channel.send('The user has been unbanned from the server'));
		}
		catch {
			message.send('That action could not be done');
		}
	},
};