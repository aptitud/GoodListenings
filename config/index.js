var mongoDbUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost:27017/GoodListenings";
var appPort = Number(process.env.PORT || 3000);
var baseUrl = 'http://localhost:' + appPort;
var authentication = {
	'clientID': '786327841427879',
	'clientSecret': '88e1f28e97a213393451a6d09aff510a',
	'callbackURL': baseUrl + '/auth/facebook/callback'
};

var config = {
	local: {
		appPort: appPort,
		mode: 'local',
		mongoDbUri: mongoDbUri,
		baseUrl: baseUrl,
		authentication: authentication
	},
	prod: {
		appPort: appPort,
		mode: 'prod',
		mongoDbUri: mongoDbUri,
		baseUrl: baseUrl,
		authentication: authentication
	}
};

module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};