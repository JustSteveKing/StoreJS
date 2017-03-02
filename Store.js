import {StorageException} from './StorageException';

export default class BaseStore {

	/**
	 * Build up base store. Takes in custom options for configuration, and then picks up any containers already created
	 * @param  {Object} options Configuration options
	 * @return {Object}         Return self
	 */
	constructor(options = null) {
		let baseOptions = {
			version: '1.0.0',
			autoClean: false,
			expirytime: Math.floor( ( Date.now() / 1000 ) + 259200 ),
			prefix: 'BS_'
		};

		if ( options !== null ) {
			Object.assign( baseOptions, options );
		}
		this.options = baseOptions;

		this.container = "";
		this.containers = [];

		for ( var i = 0; i < localStorage.length; i++ ) {
			if ( localStorage.key(i).substring(0. 3) === this.options.prefix ) {
				this.containers.push(localStorage.key(i));
			}
		}

		return this;
	}

	/**
	 * Check browser compatability of localStorage
	 * @return {Boolean} Returns true if localStorage is available
	 */
	supported() {
		// testing if localStorage is supported in this browser
		let test = "test";
		try {
			localStorage.setItem( test, test );
			localStorage.removeItem( test );
			return true;
		} catch( e ) {
			return false;
		}
	}
}
