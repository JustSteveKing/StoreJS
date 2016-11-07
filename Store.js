const containers = [];
var container = '';

class Store {

	static create(containerName, expiry, data = null) {
		localStorage.setItem(containerName, JSON.stringify({
			expiry: moment(expiry),
			data: data,
		}));
		containers.push(containerName);
		console.log(`${containerName} has been created`);
	}

	static dump(containerName) {
		localStorage.removeItem(containerName);
	}

	static use(containerName) {
		container = containerName;
		console.log(`Now using container : ${containerName}`);
	}

	static switch(containerName) {
		container = containerName;
	}

	static containers() {
		return containers;
	}

	static add(data, containerName = null, expiry = null) {
		let newExpiry;
		if(containerName === null) {
			console.log(`No container passed, using ${container}`);
		} else {
			console.log(`Adding item to ${containerName}`);
			container = containerName;
		}

		let target = JSON.parse(localStorage.getItem(container));
		
		if(expiry === null) {
			newExpiry = target.expiry;
		} else {
			newExpiry = moment(expiry);
		}
		localStorage.setItem(container, JSON.stringify({
			expiry: newExpiry,
			data: data,
		}));
		console.log(`Added data to ${container}`);
	}

	static empty(containerName = null) {
		if(containerName === null) {
			console.log(`No container passed, using ${container}`);
		} else {
			console.log(`Emptying ${containerName}`);
			container = containerName;
		}
		let target = JSON.parse(localStorage.getItem(container));

		localStorage.setItem(container, JSON.stringify({
			expiry: target.expiry,
			data: null,
		}));
		console.log(`${container} has been emptied.`);
	}

	static clean() {
		for(let i = 0, len = containers.length; i < len; i++) {
			let container = containers[i];
			container = JSON.parse(localStorage.getItem(container));
			if(moment(new Date()).isAfter(container.expiry)) {
				localStorage.removeItem(containers[i]);
				console.log(`${containers[i]} container removed`);
			}
		}
	}

	static reset() {
		localStorage.clear();
		console.log(`All containers have been reset`);
	}

	static parse(containerName = null) {
		if(containerName === null) {
			console.log(`No container passed, using ${container}`);
		} else {
			console.log(`Parsing ${containerName}`);
			container = containerName;
		}
		return JSON.parse(localStorage.getItem(container));
	}

	static supported() {
		let test = 'test';
		try {
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			return true;
		} catch(e) {
			return false;
		}
	}

}
