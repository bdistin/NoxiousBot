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
			usage: '<user:user> <reason:str>',
			usageDelim: ', '
		});
	}

	async run(msg, [user, ...reason]) {
		const embed = new this.client.methods.Embed()
			.setColor((200 * 256 * 256) + (100 * 256))
			.setAuthor(`${user.username} #${user.discriminator} [${user.id}]`, user.avatarURL())
			.setTimestamp()
			.setFooter('Kick', this.client.user.avatarURL())
			.addField('__**Responsible Mod**__', `${msg.author.username} #${msg.author.discriminator}`)
			.addField('__**Reason**__', `${reason}\n\u200b`);
		if (!msg.guild.member(user).roles.exists('name', msg.guildSettings.modRole) && !msg.guild.member(user).roles.exists('name', msg.guildSettings.adminRole) && user.id !== this.client.user.id) {
			return msg.guild.member(user).kick(reason)
				.then(() => this.client.channels.get(msg.guildSettings.logChannel).sendEmbed(embed))
				.catch(err => msg.reply(`There was an error trying to kick ${user.username}: ${err}`));
		} else {
			return msg.sendMessage('Say What?!?');
		}
	}

};
