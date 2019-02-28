class Config {
	/**
	 * @param {[]} trees A list of a configuration trees. Each item could be either an object or a string. Each object is considered as a tree-like configuration and each string is expected to be a path to a file contains such object.
	 */
	constructor(trees) {
		if (trees.length === 1) {
			this._tree = Object.assign({}, trees[0]);
			return;
		}

		this._tree = {};

		if (trees.length === 0) {
			return;
		}

		trees.forEach((tree) => {
			const treeType = typeof tree;

			switch (treeType) {
				case 'string':
					let fileContent;

					try {
						fileContent = require(require('path').resolve(process.cwd(), tree));
					} catch (e) {
						console.error('[projector/Config] File [' + tree + '] could not be read: ' + e);
						return;
					}

					this._tree = this._tree.mergeRecursive(fileContent);
				break;

				case 'object':
					this._tree = this._tree.mergeRecursive(tree);
				break;

				default:
					console.error('[projector/Config] unrecognized config tree type: ' + treeType);
			}
		});
	}

	/**
	 * Returns a property by it's path in dot-notation
	 * E.g.: `get('db.host')` will search for a root property named `db` and return it's sub-property named `host`
	 *
	 * @param {string} prop
	 * @returns {*}
	 */
	get(prop = '') {
		const path = prop.split('.');
		let pointer = this._tree;
		let part;

		while (part = path.shift()) {
			if (typeof pointer[part] === 'undefined') {
				return null;
			}

			pointer = pointer[part];
		}

		return pointer;
	}
}

module.exports = Config;
