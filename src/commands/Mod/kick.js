const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['k'],
			permLevel: 2,
			botPerms: ['KICK_MEMBERS'],
			requiredSettings: ['logChannel', 'modRole', 'adminRole'],
			description: 'Kicks a mentionned user.',
			usage: '<user:member> <reason:str> [...]',
			usageDelim: ', '
		});
	}

	async run(msg, [member, ...reason]) {
		reason = reason.join(this.usageDelim);

		const embed = new this.client.methods.Embed()
			.setColor((200 * 256 * 256) + (100 * 256))
			.setAuthor(`${member.user.tag} [${member.id}]`, member.user.avatarURL())
			.setTimestamp()
			.setFooter('Kick', this.client.user.avatarURL())
			.addField('__**Responsible Mod**__', `${msg.author.tag}`)
			.addField('__**Reason**__', `${reason}\n\u200b`);

		if (member.roles.has(msg.guildSettings.modRole) || member.roles.has(msg.guildSettings.adminRole) || !member.bannable) return msg.sendMessage('Say What?!?');

		return member.kick(reason)
			.then(() => this.client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed))
			.catch(err => msg.reply(`There was an error trying to kick ${member.user.username}: ${err}`));
	}

};
