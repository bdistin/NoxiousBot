const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 2,
			description: 'kickstarts runeinfo.'
		});
	}

	async run(msg) {
		const result = await exec('forever list')
			.catch(console.error);

		const foreverList = result.stdout.split('\n').slice(2, -1);
		let id;
		for (let i = 0; i < foreverList.length; i++) {
			if (foreverList[i].includes('\\runeinfo\\')) {
				id = i;
				break;
			}
		}

		if (typeof id !== 'undefined') {
			msg.sendMessage('Restarting RuneInfo');
			exec(`forever restart ${id}`).catch(console.error);
		} else {
			msg.sendMessage('Could not find ID to restart RuneInfo');
		}
	}

};
