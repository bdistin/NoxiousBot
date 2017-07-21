const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredSettings: ['subscriptionRole'],
			description: 'Unsubscribes to announcements.'
		});
	}

	async run(msg) {
		msg.member.removeRole(msg.guildSettings.subscriptionRole);
		return msg.sendMessage(`Removed ${msg.guild.roles.get(msg.guildSettings.subscriptionRole).name}`);
	}

};
