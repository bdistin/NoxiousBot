const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['p'],
			permLevel: 2,
			botPerms: ['READ_MESSAGE_HISTORY'],
			description: 'Cleans up messages.',
			usage: '<Number:int> [target:user|all]',
			usageDelim: ' '
		});
	}

	async run(msg, [num, target]) {
		if (target && !msg.channel.permissionsFor(this.client.user).has('MANAGE_MESSAGES')) return msg.sendMessage('Purging all messages requires "Manage Messages" permission');
		const messages = await msg.channel.fetchMessages({ limit: 100 });
		return msg.channel.bulkDelete(messages.array().filter(mes => (!target && mes.author.id === this.client.user.id) || target === 'all' || mes.author.id === target.id).slice(0, num));
	}

};
