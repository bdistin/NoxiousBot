const config = require('./config.json');
const klasa = require('klasa');
const Documentation = require('./documentation');

class Noxbot extends klasa.Client {

	constructor(...args) {
		super(...args);
		this.docs = new Documentation();
	}

}
new Noxbot(Object.assign(config, { clientBaseDir: __dirname })).login(config.botToken);
