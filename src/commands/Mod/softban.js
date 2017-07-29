const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['b'],
			permLevel: 2,
			botPerms: ['BAN_MEMBERS'],
			requiredSettings: ['logChannel', 'modRole', 'adminRole'],
			description: 'Bans a mentionned user.',
			usage: '<user:member> [days:int{1,7}] <reason:str> [...]',
			usageDelim: ', '
		});
	}

	async run(msg, [member, days = 7, ...reason]) {
		reason = reason.join(this.usageDelim);

		const embed = new this.client.methods.Embed()
			.setColor((200 * 256 * 256) + (100 * 256))
			.setTimestamp()
			.setFooter('Soft Ban', this.client.user.avatarURL())
			.addField('__**Responsible Mod**__', `${msg.author.tag}`)
			.addField('__**Reason**__', `${reason}\n\u200b`);

		if (member.roles.has(msg.guildSettings.modRole) || member.roles.has(msg.guildSettings.adminRole) || !member.bannable) return msg.sendMessage('Say What?!?');

		embed.setAuthor(`${member.user.tag} [${member.id}]`, member.user.avatarURL());
		await member.ban({ days: days, reason: reason }).catch(err => msg.reply(`There was an error trying to ban ${member.displayName}: ${err}`));
		await this.client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed);
		return msg.guild.unban(member.id).catch(err => msg.reply(`There was an error trying to unban ${member.displayName}: ${err}`));
	}

};
