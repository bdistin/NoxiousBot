const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['m'],
			permLevel: 2,
			botPerms: ['MANAGE_ROLES'],
			requiredSettings: ['logChannel', 'muteRole', 'modRole', 'adminRole'],
			description: 'Mutes a mentionned user.',
			usage: '<user:member> <reason:str> [...]',
			usageDelim: ', '
		});
	}

	async run(msg, [member, ...reason]) {
		reason = reason.join(this.usageDelim);

		const embed = new this.client.methods.Embed()
			.setColor(200)
			.setAuthor(`${member.user.tag} [${member.id}]`, member.user.avatarURL())
			.setTimestamp()
			.setFooter('Mute', this.client.user.avatarURL())
			.addField('__**Responsible Mod**__', `${msg.author.username} #${msg.author.discriminator}`)
			.addField('__**Reason**__', `${reason}\n\u200b`);

		if (member.roles.has(msg.guildSettings.modRole) || member.roles.has(msg.guildSettings.adminRole) || !member.bannable) return msg.sendMessage('Say What?!?');

		return member.addRole(msg.guildSettings.muteRole)
			.then(() => {
				this.client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed);
				this.client.setTimeout(() => {
					member.removeRole(msg.guildSettings.muteRole)
						.catch(err => msg.reply(`There was an error trying to un-mute ${member.user.username}: ${err}`));
				}, 600000);
			})
			.catch(err => msg.reply(`There was an error trying to mute ${member.user.username}: ${err}`));
	}

};
