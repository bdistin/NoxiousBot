const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, [user, ...reason]) => {
	const confs = client.funcs.confs.get(msg.guild);

	if (!confs.logChannel) return msg.sendMessage('You must set the logChannel conf to use this command.');

	const embed = new RichEmbed()
		.setColor(200)
		.setAuthor(`${user.username} #${user.discriminator} [${user.id}]`, user.avatarURL())
		.setTimestamp()
		.setFooter('Mick', client.user.avatarURL())
		.addField('__**Responsible Mod**__', `${msg.author.username} #${msg.author.discriminator}`)
		.addField('__**Reason**__', `${reason.join(' ')}\n\u200b`);
	if (!msg.guild.member(user).roles.exists('name', confs.modRole) && !msg.guild.member(user).roles.exists('name', confs.adminRole) && user.id !== client.user.id) {
		return msg.guild.member(user).addRole(msg.guild.roles.find('name', 'mute'))
			.then(() => {
				client.channels.get(confs.logChannel).sendEmbed(embed);
				client.setTimeout(() => {
					msg.guild.member(user).removeRole(msg.guild.roles.find('name', 'mute'))
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
	botPerms: ['MANAGE_ROLES_OR_PERMISSIONS'],
	requiredFuncs: []
};

exports.help = {
	name: 'mute',
	description: 'Mutes a mentionned user.',
	usage: '<user:user> <reason:str> [...]',
	usageDelim: ' '
};
