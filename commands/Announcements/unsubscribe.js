exports.run = async (client, msg) => {
	msg.member.removeRole(msg.guildSettings.subscriptionRole);
	return msg.sendMessage(`Removed ${msg.guild.roles.get(msg.guildSettings.subscriptionRole).name}`);
};

exports.conf = {
	enabled: true,
	runIn: ['text'],
	aliases: [],
	permLevel: 0,
	botPerms: [],
	requiredFuncs: [],
	requiredSettings: ['subscriptionRole']
};

exports.help = {
	name: 'unsubscribe',
	description: 'Unsubscribes from announcements.',
	usage: '',
	usageDelim: ''
};
