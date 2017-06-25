exports.run = async (client, msg, [user, ...reason]) => {
	const embed = new client.methods.Embed()
		.setColor(200)
		.setAuthor(`${user.username} #${user.discriminator} [${user.id}]`, user.avatarURL())
		.setTimestamp()
		.setFooter('Mute', client.user.avatarURL())
		.addField('__**Responsible Mod**__', `${msg.author.username} #${msg.author.discriminator}`)
		.addField('__**Reason**__', `${reason.join(' ')}\n\u200b`);
	if (!msg.guild.member(user).roles.has(msg.guildSettings.modRole.id) && !msg.guild.member(user).roles.has(msg.guildSettings.adminRole.id) && user.id !== client.user.id) {
		return msg.guild.member(user).addRole(msg.guildSettings.muteRole)
			.then(() => {
				client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed);
				client.setTimeout(() => {
					msg.guild.member(user).removeRole(msg.guildSettings.muteRole)
					.catch(err => msg.reply(`There was an error trying to un-mute ${user.username}: ${err}`));
				}, 600000);
			})
			.catch(err => msg.reply(`There was an error trying to mute ${user.username}: ${err}`));
	} else {
		return msg.sendMessage('Say What?!?');
	}
};

exports.conf = {
	enabled: true,
	runIn: ['text'],
	aliases: ['m'],
	permLevel: 2,
	botPerms: ['MANAGE_ROLES'],
	requiredFuncs: [],
	requiredSettings: ['logChannel', 'muteRole', 'modRole', 'adminRole']
};

exports.help = {
	name: 'mute',
	description: 'Mutes a mentionned user.',
	usage: '<user:user> <reason:str> [...]',
	usageDelim: ' '
};
