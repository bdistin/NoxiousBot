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
			usage: '<user:member|id:str> <reason:str> [...]',
			usageDelim: ', '
		});
	}

	async run(msg, [member, ...reason]) {
		reason = reason.join(this.usageDelim);

		const embed = new this.client.methods.Embed()
			.setColor(200 * 256 * 256)
			.setTimestamp()
			.setFooter('Ban', this.client.user.avatarURL())
			.addField('__**Responsible Mod**__', `${msg.author.tag}`)
			.addField('__**Reason**__', `${reason}\n\u200b`);

		if (typeof member === 'string') {
			if (/^<@!?\d+>$/.test(member)) [member] = /\d+/.exec(member);
			embed.setAuthor(`[${member}]`);
			return msg.guild.ban(member, { reason: reason })
				.then(() => this.client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed))
				.catch(err => msg.reply(`There was an error trying to ban ${member}: ${err}`));
		}

		if (member.roles.has(msg.guildSettings.modRole) || member.roles.has(msg.guildSettings.adminRole) || !member.bannable) return msg.sendMessage('Say What?!?');

		embed.setAuthor(`${member.user.tag} [${member.id}]`, member.user.avatarURL());
		return member.ban({ days: 7, reason: reason })
			.then(() => this.client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed))
			.catch(err => msg.reply(`There was an error trying to ban ${member.displayName}: ${err}`));
	}

};
