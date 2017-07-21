const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredSettings: ['subscriptionRole'],
			description: 'Subscribes to announcements.'
		});
	}

	async run(msg) {
		msg.member.addRole(msg.guildSettings.subscriptionRole);
		return msg.sendMessage(`Added ${msg.guild.roles.get(msg.guildSettings.subscriptionRole).name}`);
	}

};
