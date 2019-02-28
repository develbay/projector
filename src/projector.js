// extends some native classes with new methods
require('./extenders');

module.exports = {
	Config: require('./config'),
	Fs: require('./fs'),
	Utils: require('./utils'),
};
