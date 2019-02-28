const FileSystem = require('fs');
const Path = require('path');

class Fs {
	static ls(path) {
		return new Promise((resolve, reject) => {
			FileSystem.readdir(Path.isAbsolute(path) ? path : Path.resolve(process.cwd(), path), (error, files) => {
				if (error) {
					return reject(error);
				}

				resolve(files);
			});
		});
	}
}

module.exports = Fs;
