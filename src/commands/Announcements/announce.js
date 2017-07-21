const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 2,
			botPerms: ['MANAGE_ROLES'],
			requiredSettings: ['announcementsChannel', 'subscriptionRole'],
			description: 'Makes an announcement.',
			usage: '<message:str>'
		});
	}

	async run(msg, [message]) {
		await msg.guild.roles.get(msg.guildSettings.subscriptionRole).setMentionable(true);
		const embed = new this.client.methods.Embed()
			.setColor(3447003)
			.setAuthor(`${msg.author.username}`, msg.author.avatarURL())
			.setDescription(message)
			.setTimestamp()
			.setFooter(`${msg.guildSettings.prefix}subscribe or ${msg.guildSettings.prefix}unsubscribe at any time.`, this.client.user.avatarURL());
		return msg.guild.channels.get(msg.guildSettings.announcementsChannel).sendEmbed(embed, msg.guild.roles.get(msg.guildSettings.subscriptionRole).toString())
			.then(async mes => {
				await msg.guild.roles.get(msg.guildSettings.subscriptionRole).setMentionable(false);
				msg.delete();
				return mes;
			});
	}

};
