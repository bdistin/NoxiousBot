const request = require('superagent');

exports.run = async (client, msg) => {
    let i = 0;
    const res = await request.get('https://bans.discordlist.net/api').accept('json');
    const banlist = JSON.parse(`[${res.text.replace(/\[|\]/g, '')}]`);
    const bans = await msg.guild.fetchBans();
    banlist.filter(ban => /^[0-9]+$/.test(ban)).forEach((ban) => {
        if(!bans.has(ban)) i++;
    });
    banlist.filter(ban => /^[0-9]+$/.test(ban)).forEach((ban) => {
        if(!bans.has(ban)) msg.guild.ban(ban).catch(console.error);
    });
    msg.channel.sendMessage(`Immunized against ${i} new threats.`);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [''],
	permLevel: 2,
	botPerms: ['BAN_MEMBERS'],
	requiredFuncs: []
};

exports.help = {
	name: 'immunize',
	description: 'Immunizes the guild from DiscordList banned users.',
	usage: '',
	usageDelim: ''
};