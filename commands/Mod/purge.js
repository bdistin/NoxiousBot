exports.run = async (client, msg, [num, target]) => {
	if (target && !msg.channel.permissionsFor(client.user).hasPermission('MANAGE_MESSAGES')) return msg.sendMessage('Purging all messages requires "Manage Messages" permission');
	const messages = await msg.channel.fetchMessages({ limit: 100 });
	return client.bulkDelete(msg, messages.array().filter(mes => (!target && mes.author.id === client.user.id) || target === 'all' || mes.author.id === target.id).slice(0, num));
};

exports.conf = {
	enabled: true,
	runIn: ['text'],
	aliases: ['p'],
	permLevel: 2,
	botPerms: ['READ_MESSAGE_HISTORY'],
	requiredFuncs: [],
	requiredSettings: []
};

exports.help = {
	name: 'purge',
	description: 'Cleans up messages.',
	usage: '<Number:int> [target:user|all]',
	usageDelim: ' '
};
