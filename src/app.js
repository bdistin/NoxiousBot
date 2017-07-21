const config = require('./config.json');
const klasa = require('klasa');
new klasa.Client(Object.assign(config, { clientBaseDir: __dirname })).login(config.botToken);
