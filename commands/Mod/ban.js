exports.run = async (client, msg, [user, ...reason]) => {
	const embed = new client.methods.Embed()
		.setColor(200 * 256 * 256)
		.setTimestamp()
		.setFooter('Ban', client.user.avatarURL())
		.addField('__**Responsible Mod**__', `${msg.author.username} #${msg.author.discriminator}`)
		.addField('__**Reason**__', `${reason.join(' ')}\n\u200b`);

	if (typeof user === 'string') {
		if (/^<@!?\d+>$/.test(user)) user = /\d+/.exec(user)[0];
		embed.setAuthor(`[${user}]`);
		return msg.guild.ban(user, { reason: reason.join(' ') })
			.then(() => client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed))
			.catch(err => msg.reply(`There was an error trying to ban ${user.username}: ${err}`));
	} else if (!msg.guild.member(user).roles.has(msg.guildSettings.modRole) && !msg.guild.member(user).roles.has(msg.guildSettings.adminRole) && user.id !== client.user.id) {
		embed.setAuthor(`${user.username} #${user.discriminator} [${user.id}]`, user.avatarURL());
		return msg.guild.member(user).ban({ days: 7, reason: reason.join(' ') })
			.then(() => client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed))
			.catch(err => msg.reply(`There was an error trying to ban ${user.username}: ${err}`));
	} else {
		return msg.sendMessage('Say What?!?');
	}
};

exports.conf = {
	enabled: true,
	runIn: ['text'],
	aliases: ['b'],
	permLevel: 2,
	botPerms: ['BAN_MEMBERS'],
	requiredFuncs: [],
	requiredSettings: ['logChannel', 'modRole', 'adminRole']
};

exports.help = {
	name: 'ban',
	description: 'Bans a mentionned user.',
	usage: '<user:user|id:str> <reason:str> [...]',
	usageDelim: ' '
};
