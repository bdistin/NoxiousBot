const request = require('snekfetch');

const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 2,
			botPerms: ['BAN_MEMBERS'],
			description: 'Immunizes the guild from DiscordList banned users.'
		});
	}

	async run(msg) {
		let i = 0;
		const res = await request.post(`https://bans.discordlist.net/api`)
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({ token: this.client.config.discordList });
		console.log(res.text);
		const banlist = JSON.parse(`[${res.text.replace(/\[|\]/g, '')}]`);
		const bans = await msg.guild.fetchBans();
		banlist.filter(ban => /^[0-9]+$/.test(ban)).forEach((ban) => {
			if (!bans.has(ban)) {
				msg.guild.ban(ban, { reason: 'DiscordList Immunized' }).catch(console.error);
				i++;
			}
		});
		msg.sendMessage(`Immunized against ${i} new threats.`);
	}

};
