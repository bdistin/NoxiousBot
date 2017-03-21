const { RichEmbed } = require('discord.js');

exports.run = (client, msg, [user, ...reason]) => {
	const confs = client.funcs.confs.get(msg.guild);

	if (!confs.logChannel) return msg.channel.sendMessage('You must set the logChannel conf to use this command.');

	const embed = new RichEmbed()
			.setColor((200 * 256 * 256) + (100 * 256))
			.setAuthor(`${user.username} #${user.discriminator} [${user.id}]`, user.avatarURL)
			.setTimestamp()
			.setFooter('Kick', client.user.avatarURL)
			.addField('__**Responsible Mod**__', `${msg.author.username} #${msg.author.discriminator}`)
			.addField('__**Reason**__', `${reason.join(' ')}\n\u200b`);
	if (!msg.guild.member(user).roles.exists('name', confs.modRole) && !msg.guild.member(user).roles.exists('name', confs.adminRole) && user.id !== client.user.id) {
		return msg.guild.member(user).kick()
			.then(() => client.channels.get(confs.logChannel).sendEmbed(embed))
			.catch(err => msg.reply(`There was an error trying to kick ${user.username}: ${err}`));
	} else {
		return msg.channel.sendMessage('Say What?!?');
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['k'],
	permLevel: 2,
	botPerms: ['KICK_MEMBERS'],
	requiredFuncs: []
};

exports.help = {
	name: 'kick',
	description: 'Kicks a mentionned user.',
	usage: '<user:user> <reason:str>',
	usageDelim: ' '
};
