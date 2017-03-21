const { RichEmbed } = require('discord.js');

exports.run = (client, msg, [user, ...reason]) => {
	const confs = client.funcs.confs.get(msg.guild);

	if (!confs.logChannel) return msg.channel.sendMessage('You must set the logChannel conf to use this command.');

	const embed = new RichEmbed()
			.setColor(200 * 256 * 256)
			.setTimestamp()
			.setFooter('Ban', client.user.avatarURL)
			.addField('__**Responsible Mod**__', `${msg.author.username} #${msg.author.discriminator}`)
			.addField('__**Reason**__', `${reason.join(' ')}\n\u200b`);

	if (typeof user === 'string') {
		if (/^<@!?\d+>$/.test(user)) user = /\d+/.exec(user)[0];
		embed.setAuthor(`[${user}]`);
		return msg.guild.ban(user)
			.then(() => client.channels.get(confs.logChannel).sendEmbed(embed))
			.catch(err => msg.reply(`There was an error trying to ban ${user.username}: ${err}`));
	} else if (!msg.guild.member(user).roles.exists('name', confs.modRole) && !msg.guild.member(user).roles.exists('name', confs.adminRole) && user.id !== client.user.id) {
		embed.setAuthor(`${user.username} #${user.discriminator} [${user.id}]`, user.avatarURL);
		return msg.guild.member(user).ban()
				.then(() => client.channels.get(confs.logChannel).sendEmbed(embed))
				.catch(err => msg.reply(`There was an error trying to ban ${user.username}: ${err}`));
	} else {
		return msg.channel.sendMessage('Say What?!?');
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['b'],
	permLevel: 2,
	botPerms: ['BAN_MEMBERS'],
	requiredFuncs: []
};

exports.help = {
	name: 'ban',
	description: 'Bans a mentionned user.',
	usage: '<user:user|id:str> <reason:str>',
	usageDelim: ' '
};
