const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['dm', 'text'],
			permLevel: 10,
			description: 'test',
			usage: '<user:user> <role:role>',
			usageDelim: ' '
		});
	}

	async run(msg, [channel, role]) {
		msg.reply('ok');
	}

};

