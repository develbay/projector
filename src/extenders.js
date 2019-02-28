if (typeof Array.prototype.unique === 'undefined') {
	Array.prototype.unique = function() {
		return Array.prototype.filter.call(this, (item, position, array) => array.indexOf(item) === position);
	};
}

if (typeof Object.prototype.mergeRecursive === 'undefined') {
	Object.prototype.mergeRecursive = function(extender) {
		if (this.constructor.name !== 'Object') {
			throw new Error('Object.mergeRecursive works only on Object class');
		}

		const mr = (base, extender) => {
			const newbie = Object.assign({}, base);

			for (let key in extender) {
				if (!extender.hasOwnProperty(key)) {
					continue;
				}

				if (
					typeof base[key] === 'object'
					&& base[key].constructor.name === 'Object'
					&& typeof extender[key] === 'object'
					&& extender[key].constructor.name === 'Object'
				) {
					newbie[key] = mr(base[key], extender[key]);
				} else {
					newbie[key] = extender[key];
				}
			}

			return newbie;
		};

		return mr(this, extender);
	};
}

if (typeof String.prototype.lcFirst === 'undefined') {
	String.prototype.lcFirst = function() {
		return String.prototype.substr.call(this, 0, 1).toLowerCase() + String.prototype.substr.call(this, 1);
	};
}

if (typeof String.prototype.ucFirst === 'undefined') {
	String.prototype.ucFirst = function() {
		return String.prototype.substr.call(this, 0, 1).toUpperCase() + String.prototype.substr.call(this, 1);
	};
}
