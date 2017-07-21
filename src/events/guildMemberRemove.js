const { Event } = require('klasa');

module.exports = class extends Event {

	async run(member) {
		if (member.guild.settings.logChannel) {
			const embed = new this.client.methods.Embed()
				.setColor((200 * 256 * 256) + 100)
				.setAuthor(`${member.user.username} #${member.user.discriminator} [${member.user.id}]`, member.user.avatarURL())
				.setTimestamp()
				.setFooter('Left', this.client.user.avatarURL());
			this.client.channels.get(member.guild.settings.logChannel).sendEmbed(embed);
		}
	}

};
