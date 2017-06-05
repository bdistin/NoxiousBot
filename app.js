const config = require('./config.json');
const Komada = require('komada');
const client = new Komada.Client(config);

client.login(config.botToken);
