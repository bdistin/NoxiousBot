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
			usage: '<user:user|id:str> <reason:str>',
			usageDelim: ', '
		});
	}

	async run(msg, [user, reason]) {
		const embed = new this.client.methods.Embed()
			.setColor(200 * 256 * 256)
			.setTimestamp()
			.setFooter('Ban', this.client.user.avatarURL())
			.addField('__**Responsible Mod**__', `${msg.author.username} #${msg.author.discriminator}`)
			.addField('__**Reason**__', `${reason}\n\u200b`);

		if (typeof user === 'string') {
			if (/^<@!?\d+>$/.test(user)) [user] = /\d+/.exec(user);
			embed.setAuthor(`[${user}]`);
			return msg.guild.ban(user, { reason: reason })
				.then(() => this.client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed))
				.catch(err => msg.reply(`There was an error trying to ban ${user.username}: ${err}`));
		} else if (!msg.guild.member(user).roles.has(msg.guildSettings.modRole) && !msg.guild.member(user).roles.has(msg.guildSettings.adminRole) && user.id !== this.client.user.id) {
			embed.setAuthor(`${user.username} #${user.discriminator} [${user.id}]`, user.avatarURL());
			return msg.guild.member(user).ban({ days: 7, reason: reason })
				.then(() => this.client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed))
				.catch(err => msg.reply(`There was an error trying to ban ${user.username}: ${err}`));
		} else {
			return msg.sendMessage('Say What?!?');
		}
	}

};
