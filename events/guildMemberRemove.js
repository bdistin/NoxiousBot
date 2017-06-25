const { RichEmbed } = require('discord.js');

exports.run = (client, member) => {
	if (member.guild.settings.logChannel) {
		const embed = new RichEmbed()
			.setColor((200 * 256 * 256) + 100)
			.setAuthor(`${member.user.username} #${member.user.discriminator} [${member.user.id}]`, member.user.avatarURL())
			.setTimestamp()
			.setFooter('Left', client.user.avatarURL());
		client.channels.get(member.guild.settings.logChannel).sendEmbed(embed);
	}
};
