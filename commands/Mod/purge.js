exports.run = async (client, msg, [num, type]) => {
	if (type && !msg.channel.permissionsFor(client.user).hasPermission('MANAGE_MESSAGES')) return msg.channel.sendMessage('Purging all messages requires "Manage Messages" permission');

	let messages = await msg.channel.fetchMessages({ limit: 100 });
	if (type) {
		if (type === 'all') {
			messages = messages.array().slice(0, num);
		} else {
			messages = messages.array().filter(mes => mes.author.id === type.id).slice(0, num);
		}
	} else {
		messages = messages.array().filter(mes => mes.author.id === client.user.id).slice(0, num);
	}
	return msg.channel.bulkDelete(messages);
};

exports.conf = {
	enabled: true,
	runIn: ['text'],
	aliases: ['p'],
	permLevel: 2,
	botPerms: ['READ_MESSAGE_HISTORY'],
	requiredFuncs: []
};

exports.help = {
	name: 'purge',
	description: 'Cleans up messages.',
	usage: '<Number:int> [target:user|all]',
	usageDelim: ' '
};
