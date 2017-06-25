exports.run = async (client, msg, [message]) => {
	await msg.guild.roles.get(msg.guildSettings.subscriptionRole).setMentionable(true);
	const embed = new client.methods.Embed()
		.setColor(3447003)
		.setAuthor(`${msg.author.username}`, msg.author.avatarURL())
		.setDescription(message)
		.setTimestamp()
		.setFooter(`${msg.guildSettings.prefix}subscribe or ${msg.guildSettings.prefix}unsubscribe at any time.`, client.user.avatarURL());
	return msg.guild.channels.get(msg.guildSettings.announcementsChannel).sendEmbed(embed, msg.guild.roles.get(msg.guildSettings.subscriptionRole).toString())
		.then(async mes => {
			await msg.guild.roles.get(msg.guildSettings.subscriptionRole).setMentionable(false);
			msg.delete();
			return mes;
		});
};

exports.conf = {
	enabled: true,
	runIn: ['text'],
	aliases: [],
	permLevel: 2,
	botPerms: ['MANAGE_ROLES'],
	requiredFuncs: [],
	requiredSettings: ['announcementsChannel', 'subscriptionRole']
};

exports.help = {
	name: 'announce',
	description: 'Makes an announcement.',
	usage: '<message:str>',
	usageDelim: ''
};
