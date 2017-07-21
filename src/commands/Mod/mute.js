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
			usage: '<user:user> <reason:str>',
			usageDelim: ', '
		});
	}

	async run(msg, [user, reason]) {
		const embed = new this.client.methods.Embed()
			.setColor(200)
			.setAuthor(`${user.username} #${user.discriminator} [${user.id}]`, user.avatarURL())
			.setTimestamp()
			.setFooter('Mute', this.client.user.avatarURL())
			.addField('__**Responsible Mod**__', `${msg.author.username} #${msg.author.discriminator}`)
			.addField('__**Reason**__', `${reason}\n\u200b`);
		if (!msg.guild.member(user).roles.has(msg.guildSettings.modRole.id) && !msg.guild.member(user).roles.has(msg.guildSettings.adminRole.id) && user.id !== this.client.user.id) {
			return msg.guild.member(user).addRole(msg.guildSettings.muteRole)
				.then(() => {
					this.client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed);
					this.client.setTimeout(() => {
						msg.guild.member(user).removeRole(msg.guildSettings.muteRole)
							.catch(err => msg.reply(`There was an error trying to un-mute ${user.username}: ${err}`));
					}, 600000);
				})
				.catch(err => msg.reply(`There was an error trying to mute ${user.username}: ${err}`));
		} else {
			return msg.sendMessage('Say What?!?');
		}
	}

};
