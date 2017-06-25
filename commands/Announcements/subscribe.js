exports.run = async (client, msg) => {
	msg.member.addRole(msg.guildSettings.subscriptionRole);
	return msg.sendMessage(`Added ${msg.guild.roles.get(msg.guildSettings.subscriptionRole).name}`);
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
	name: 'subscribe',
	description: 'Subscribes to announcements.',
	usage: '',
	usageDelim: ' '
};
