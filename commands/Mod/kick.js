exports.run = async (client, msg, [user, ...reason]) => {
	const embed = new client.methods.Embed()
		.setColor((200 * 256 * 256) + (100 * 256))
		.setAuthor(`${user.username} #${user.discriminator} [${user.id}]`, user.avatarURL())
		.setTimestamp()
		.setFooter('Kick', client.user.avatarURL())
		.addField('__**Responsible Mod**__', `${msg.author.username} #${msg.author.discriminator}`)
		.addField('__**Reason**__', `${reason.join(' ')}\n\u200b`);
	if (!msg.guild.member(user).roles.exists('name', msg.guildSettings.modRole) && !msg.guild.member(user).roles.exists('name', msg.guildSettings.adminRole) && user.id !== client.user.id) {
		return msg.guild.member(user).kick(reason.join(' '))
			.then(() => client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed))
			.catch(err => msg.reply(`There was an error trying to kick ${user.username}: ${err}`));
	} else {
		return msg.sendMessage('Say What?!?');
	}
};

exports.conf = {
	enabled: true,
	runIn: ['text'],
	aliases: ['k'],
	permLevel: 2,
	botPerms: ['KICK_MEMBERS'],
	requiredFuncs: [],
	requiredSettings: ['logChannel', 'modRole', 'adminRole']
};

exports.help = {
	name: 'kick',
	description: 'Kicks a mentionned user.',
	usage: '<user:user> <reason:str> [...]',
	usageDelim: ' '
};
