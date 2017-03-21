const { RichEmbed } = require('discord.js');

exports.run = (client, member) => {
	const confs = client.funcs.confs.get(member.guild);

	if (confs.logChannel) {
		const embed = new RichEmbed()
			.setColor(200 * 256)
			.setAuthor(`${member.user.username} #${member.user.discriminator} [${member.user.id}]`, member.user.avatarURL)
			.setTimestamp()
			.setFooter('Joined', client.user.avatarURL);
		client.channels.get(confs.logChannel).sendEmbed(embed);
	}
};
