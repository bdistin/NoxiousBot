const { Monitor } = require('klasa');

module.exports = class extends Monitor {

	async run(msg) {
		const prefix = 'klasa, ';
		if (!msg.content.toLowerCase().startsWith(prefix)) return;
		const parameters = msg.content.toLowerCase().slice(prefix.length).split(' ');
		const command = parameters[0];
		const args = parameters.slice(1);
		const validCommand = this.client.commands.get(command);
		if (validCommand && validCommand.category === 'Klasa') validCommand.run(this.client, msg, args);
		else this.client.docs.lookup.respond(msg, parameters);
	}

};
