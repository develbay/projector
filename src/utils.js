const { URL } = require('url');
const Http = require('http');

class Utils {
	/**
	 * @param {Date?} date
	 * @returns {number}
	 */
	static timestamp(date) {
		return Math.floor((date || Date.now()) / 1000);
	}

	static httpRequest(options) {
		let optionsWrapped;

		switch (options.constructor.name) {
			case 'String':
				optionsWrapped = new URL(options);
			break;

			case 'URL':
			case 'Object':
				optionsWrapped = options;
			break;

			default:
				throw new Error('Unrecognized type of an `options` argument');
		}

		return new Promise((resolve, reject) => {
			const request = Http.request(optionsWrapped, (response) => {
				let data = Buffer.from([]);
				response.setEncoding('utf8');

				response.on('data', (chunk) => {
					data = Buffer.concat([
						data,
						Buffer.from(chunk),
					]);
				});

				response.on('end', () => {
					resolve({ response, data });
				});
			});

			request.on('error', (error) => {
				reject(error);
			});

			//request.write();
			request.end();
		});
	}
}

module.exports = Utils;
